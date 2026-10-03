import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  HeartPulse,
  Users,
  Wallet,
  Pause,
  Play,
} from 'lucide-react';
import './hero-experience.css';
import LifeChapters from './LifeChapters';

const chapters = [
  {
    name: 'Your health',
    icon: HeartPulse,
    title: 'Treatment costs. Understood.',
    copy: 'A medical card helps with eligible treatment bills. Annual limits, deductibles, co-payments, and exclusions are the details worth knowing.',
    topic: 'Medical protection',
    link: 'Make sense of my medical cover',
  },
  {
    name: 'Your income',
    icon: Wallet,
    title: 'Recovery needs breathing room.',
    copy: 'Critical illness cover can provide a lump sum when a diagnosis meets the policy’s covered conditions. Think about everyday commitments as well as treatment.',
    topic: 'Critical illness',
    link: 'Talk about critical illness cover',
  },
  {
    name: 'Your people',
    icon: Users,
    title: 'Their future is part of yours.',
    copy: 'Life protection can support the people who depend on you after a covered event. Start with your responsibilities, existing benefits, and a sustainable budget.',
    topic: 'Life & family',
    link: 'Plan around my family',
  },
];

function ShieldSculpture({
  active,
  moving,
  spread,
  onSelect,
}: {
  active: number;
  moving: boolean;
  spread: number;
  onSelect: (index: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<import('./shield-scene').ShieldController | null>(null);
  const initial = useRef({ active, moving, spread, onSelect });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    const container = host.current;
    if (!container) return;
    const mount = () => {
      void import('./shield-scene')
        .then(({ mountShield }) => {
          if (disposed) return;
          controller.current = mountShield(container, {
            ...initial.current,
            onReady: setReady,
          });
        })
        .catch(() => {
          if (!disposed) setReady(false);
        });
    };
    // Keep deep-link visits light; render the scene only when it approaches the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(mount);
      },
      { rootMargin: '120px' },
    );
    observer.observe(container);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);
  useEffect(() => {
    initial.current.active = active;
    controller.current?.select(active);
  }, [active]);
  useEffect(() => {
    initial.current.moving = moving;
    controller.current?.motion(moving);
  }, [moving]);
  useEffect(() => {
    initial.current.spread = spread;
    controller.current?.separate(spread);
  }, [spread]);
  return (
    <div className="shield-render" ref={host} data-ready={ready} aria-hidden="true">
      <div className="shield-fallback">
        <HeartPulse />
        <Wallet />
        <Users />
      </div>
    </div>
  );
}

function ConnectedHero({ onTopic }: { onTopic: (topic: string) => void }) {
  const [active, setActive] = useState(0);
  const [spread, setSpread] = useState(65);
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const chapter = chapters[active];
  const Icon = chapter.icon;
  return (
    <section className="connected-hero" aria-labelledby="connected-heading">
      <div className="connected-copy">
        <h1 id="connected-heading">
          Life is
          <br />
          <em>connected.</em>
          <span>Your protection should be, too.</span>
        </h1>
        <p className="connected-description">
          Your health. Your income. Your people.
          <br />
          Explore how each layer plays a different part.
        </p>
        <div className="connected-actions">
          <a href="#contact" className="button">
            Let’s connect the dots <ArrowUpRight size={18} />
          </a>
          <a href="#check-in" className="text-link">
            Find my starting point <ArrowRight size={16} />
          </a>
        </div>
        <div className="connected-signature">
          <span className="signature">Jayce</span>
          <span>
            <strong>Jayce Yap Zi Wen</strong>AIA Life Planner · Malaysia
          </span>
        </div>
      </div>
      <div className="connected-art">
        <div className="sculpture-disc" aria-hidden="true" />
        <ShieldSculpture
          active={active}
          moving={!paused && !reduced}
          spread={spread / 100}
          onSelect={setActive}
        />
        <span className="sculpture-shadow" aria-hidden="true" />
        <div className="shield-controls">
          <label htmlFor="shield-spread">
            Explore the layers <span>{spread}% open</span>
          </label>
          <input
            id="shield-spread"
            type="range"
            min="0"
            max="100"
            step="1"
            value={spread}
            onChange={(event) => setSpread(Number(event.target.value))}
            aria-valuetext={`${spread}% separated`}
          />
          <div>
            <span>Together</span>
            <span>Separated</span>
          </div>
          <p>Select a shield or a topic below.</p>
        </div>
        {!reduced && (
          <button
            className="motion-control"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Play sculpture motion' : 'Pause sculpture motion'}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        )}
      </div>
      <div className="connection-explorer">
        <div className="chapter-selector" role="group" aria-label="Explore what matters to you">
          <span>What matters to you?</span>
          <div>
            {chapters.map((item, i) => {
              const ChapterIcon = item.icon;
              return (
                <button key={item.name} aria-pressed={active === i} onClick={() => setActive(i)}>
                  <ChapterIcon size={17} strokeWidth={1.4} />
                  {item.name}
                  <span className="chapter-indicator" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="chapter-detail" aria-live="polite" aria-atomic="true">
          <div className="chapter-detail-title">
            <Icon size={20} strokeWidth={1.3} />
            <h2>{chapter.title}</h2>
          </div>
          <p>{chapter.copy}</p>
          <a href="#contact" onClick={() => onTopic(chapter.topic)}>
            {chapter.link}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <a
          className="connected-scroll"
          href="#protection"
          aria-label="Explore all protection areas"
        >
          <ArrowDown size={19} />
        </a>
      </div>
    </section>
  );
}

export default function HeroExperience({
  portrait,
  onTopic,
}: {
  portrait: ReactNode;
  onTopic: (topic: string) => void;
}) {
  const readVersion = () =>
    new URLSearchParams(window.location.search).get('hero') === 'portrait'
      ? 'portrait'
      : new URLSearchParams(window.location.search).get('hero') === 'chapters'
        ? 'chapters'
        : 'sculpture';
  const [version, setVersion] = useState(readVersion);
  useEffect(() => {
    const sync = () => setVersion(readVersion());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const change = (next: string) => {
    setVersion(next);
    const url = new URL(window.location.href);
    if (next !== 'sculpture') url.searchParams.set('hero', next);
    else url.searchParams.delete('hero');
    window.history.replaceState(null, '', url);
  };
  return (
    <div id="home" className="hero-experience">
      <div className="hero-style-bar">
        <div className="hero-style-switch" role="group" aria-label="Hero style">
          <button aria-pressed={version === 'sculpture'} onClick={() => change('sculpture')}>
            Sculpture
          </button>
          <button aria-pressed={version === 'portrait'} onClick={() => change('portrait')}>
            Portrait
          </button>
          <button aria-pressed={version === 'chapters'} onClick={() => change('chapters')}>
            Life chapters
          </button>
        </div>
      </div>
      <div className="hero-version" key={version}>
        {version === 'portrait' ? (
          portrait
        ) : version === 'chapters' ? (
          <LifeChapters onTopic={onTopic} />
        ) : (
          <ConnectedHero onTopic={onTopic} />
        )}
      </div>
    </div>
  );
}
