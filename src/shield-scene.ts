import {
  WebGLRenderer,
  ACESFilmicToneMapping,
  Scene,
  PerspectiveCamera,
  HemisphereLight,
  DirectionalLight,
  MeshPhysicalMaterial,
  Mesh,
  Group,
  Shape,
  ExtrudeGeometry,
  BoxGeometry,
  SphereGeometry,
  Raycaster,
  Vector2,
  type BufferGeometry,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export type ShieldController = {
  select: (index: number) => void;
  separate: (value: number) => void;
  motion: (enabled: boolean) => void;
  dispose: () => void;
};

export function mountShield(
  container: HTMLDivElement,
  options: {
    active: number;
    moving: boolean;
    spread: number;
    onSelect: (index: number) => void;
    onReady: (ready: boolean) => void;
  },
): ShieldController {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0, 10);
  // Direct lighting preserves the sculpture's intended shading without generating
  // a runtime PMREM environment map during the page's critical rendering path.
  scene.add(new HemisphereLight(0xfff6e5, 0x45262a, 1.5));
  const light = new DirectionalLight(0xfff8ed, 3);
  light.position.set(-3, 5, 6);
  scene.add(light);

  const outline = new Shape();
  outline.moveTo(0, 1.45);
  outline.bezierCurveTo(0.4, 1.15, 0.8, 1.12, 1.15, 1.06);
  outline.lineTo(1.1, -0.22);
  outline.bezierCurveTo(1.06, -0.83, 0.56, -1.28, 0, -1.6);
  outline.bezierCurveTo(-0.56, -1.28, -1.06, -0.83, -1.1, -0.22);
  outline.lineTo(-1.15, 1.06);
  outline.bezierCurveTo(-0.8, 1.12, -0.4, 1.15, 0, 1.45);
  const geometry = new ExtrudeGeometry(outline, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06,
    curveSegments: 28,
  });
  const symbolBox = new BoxGeometry(1, 1, 1);
  const symbolHead = new SphereGeometry(0.13, 20, 14);
  const symbolMaterial = new MeshPhysicalMaterial({
    color: 0xfff5df,
    metalness: 0.4,
    roughness: 0.32,
  });
  const materials = [0xa1253b, 0x657761, 0xae8755].map(
    (color) => new MeshPhysicalMaterial({ color, metalness: 0.4, roughness: 0.3, clearcoat: 0.35 }),
  );
  const assembly = new Group();
  assembly.rotation.set(-0.08, -0.3, -0.045);
  scene.add(assembly);
  const targets: Mesh[] = [];
  const symbols: BufferGeometry[] = [];
  const plates = materials.map((material, index) => {
    const plate = new Group();
    const face = new Mesh(geometry, material);
    face.userData.layer = index;
    targets.push(face);
    plate.add(face);
    const parts: BufferGeometry[] = [];
    const bar = (x: number, y: number, w: number, h: number) => {
      parts.push(symbolBox.clone().scale(w, h, 0.075).translate(x, y, 0.25));
    };
    if (index === 0) {
      bar(0, 0.1, 0.75, 0.2);
      bar(0, 0.1, 0.2, 0.75);
    }
    if (index === 1) {
      [-0.3, 0, 0.3].forEach((x, i) => bar(x, -0.18 + i * 0.1, 0.18, 0.4 + i * 0.2));
    }
    if (index === 2) {
      [-0.36, 0, 0.36].forEach((x, i) => {
        parts.push(symbolHead.clone().translate(x, i === 1 ? 0.14 : 0.32, 0.27));
        bar(x, i === 1 ? -0.18 : -0.05, 0.19, i === 1 ? 0.3 : 0.42);
      });
    }
    // One draw per complete symbol, with the original geometry and finish intact.
    const symbol = mergeGeometries(parts)!;
    parts.forEach((part) => part.dispose());
    symbols.push(symbol);
    plate.add(new Mesh(symbol, symbolMaterial));
    assembly.add(plate);
    return plate;
  });

  let selected = options.active;
  let spread = options.spread;
  let enabled = options.moving;
  let visible = true;
  let lostContext = false;
  let phase = 0;
  let previousTime = 0;
  let running = false;
  let prepared = false;
  let disposed = false;
  let preparation = 0;
  const pointer = { x: 0, y: 0 };
  const pose = (factor: number) => {
    plates.forEach((plate, i) => {
      const rank = (i - selected + 3) % 3;
      const x = (i - 1) * 1.72 * spread + rank * 0.2 * (1 - spread);
      const y = (i === selected ? 0.16 : -0.08) * spread;
      const z = (2 - rank) * 0.33 * (1 - spread) + (i === selected ? 0.26 : 0);
      plate.position.x += (x - plate.position.x) * factor;
      plate.position.y += (y - plate.position.y) * factor;
      plate.position.z += (z - plate.position.z) * factor;
      plate.rotation.y += ((i - 1) * -0.13 * spread - plate.rotation.y) * factor;
    });
  };
  const draw = () => {
    if (prepared && !lostContext && !disposed) renderer.render(scene, camera);
  };
  const tick = (time: number) => {
    const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
    previousTime = time;
    if (enabled) {
      phase += delta;
      const follow = 1 - Math.exp(-12 * delta);
      assembly.rotation.y +=
        (-0.3 + pointer.x * 0.25 + Math.sin(phase * 0.3) * 0.055 - assembly.rotation.y) * follow;
      assembly.rotation.x += (-0.08 + pointer.y * 0.12 - assembly.rotation.x) * follow;
      assembly.position.y = Math.sin(phase * 0.6) * 0.04;
    }
    pose(1 - Math.exp(-18 * delta));
    draw();
  };
  const sync = () => {
    const shouldRun =
      prepared && !disposed && visible && !document.hidden && !lostContext && enabled;
    if (shouldRun !== running) {
      running = shouldRun;
      previousTime = 0;
      renderer.setAnimationLoop(running ? tick : null);
    }
    if (!running && visible && !document.hidden) draw();
  };
  const update = () => {
    // Active motion consumes the latest input on its next frame, without extra draws.
    if (!enabled) {
      pose(1);
      sync();
    }
  };
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.9 ? 11.5 : 10;
    camera.updateProjectionMatrix();
    if (!running && visible && !document.hidden) draw();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(container);
  const raycaster = new Raycaster();
  const coords = new Vector2();
  const pick = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    coords.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(coords, camera);
    return raycaster.intersectObjects(targets)[0]?.object.userData.layer as number | undefined;
  };
  let pointerFrame = 0;
  let lastPointer: PointerEvent | null = null;
  const move = (event: PointerEvent) => {
    lastPointer = event;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!lastPointer || disposed || lostContext || !prepared) return;
      const event = lastPointer;
      container.style.cursor = pick(event) === undefined ? 'default' : 'pointer';
      if (!enabled || event.pointerType !== 'mouse') return;
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    });
  };
  let down: { x: number; y: number } | null = null;
  const press = (event: PointerEvent) => {
    down = { x: event.clientX, y: event.clientY };
  };
  const release = (event: PointerEvent) => {
    if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) < 8) {
      const index = pick(event);
      if (index !== undefined) options.onSelect(index);
    }
    down = null;
  };
  const leave = () => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    lastPointer = null;
    pointer.x = 0;
    pointer.y = 0;
    down = null;
  };
  const lost = (event: Event) => {
    event.preventDefault();
    lostContext = true;
    prepared = false;
    preparation++;
    running = false;
    renderer.setAnimationLoop(null);
    options.onReady(false);
  };
  const prepare = () => {
    const request = ++preparation;
    void renderer
      .compileAsync(scene, camera)
      .then(() => {
        if (disposed || lostContext || request !== preparation) return;
        prepared = true;
        sync();
        options.onReady(true);
      })
      .catch(() => {
        if (!disposed) options.onReady(false);
      });
  };
  const restored = () => {
    lostContext = false;
    prepare();
  };
  container.addEventListener('pointermove', move);
  container.addEventListener('pointerdown', press);
  container.addEventListener('pointerup', release);
  container.addEventListener('pointerleave', leave);
  container.addEventListener('pointercancel', leave);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  renderer.domElement.addEventListener('webglcontextrestored', restored);
  document.addEventListener('visibilitychange', sync);
  pose(1);
  resize();
  prepare();
  return {
    select(index) {
      selected = index;
      update();
    },
    separate(value) {
      spread = value;
      update();
    },
    motion(value) {
      enabled = value;
      if (!enabled) pose(1);
      sync();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(pointerFrame);
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      observer.disconnect();
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerdown', press);
      container.removeEventListener('pointerup', release);
      container.removeEventListener('pointerleave', leave);
      container.removeEventListener('pointercancel', leave);
      document.removeEventListener('visibilitychange', sync);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      renderer.domElement.removeEventListener('webglcontextrestored', restored);
      geometry.dispose();
      symbolBox.dispose();
      symbolHead.dispose();
      symbols.forEach((symbol) => symbol.dispose());
      symbolMaterial.dispose();
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
