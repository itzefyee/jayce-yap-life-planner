import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type CSSProperties,
} from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  ChevronLeft,
  X,
  Menu,
  Heart,
  ShieldCheck,
  Plus,
  CalendarDays,
  Clock3,
  Video,
  MessageCircle,
  Users,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { articles, coverage, faqs, helloUrl, profile, whatsappUrl } from './content';
import HeroExperience from './HeroExperience';

const Arrow = () => <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />;

function usePageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const progress = document.querySelector<HTMLElement>('.scroll-progress');
    let frame = 0;
    let range = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        progress?.style.setProperty(
          '--scroll-progress',
          String(range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0),
        );
        const portrait = document.querySelector<HTMLElement>('.portrait');
        if (portrait) {
          const shift = reduced.matches ? '0px' : `${Math.min(window.scrollY * 0.1, 65)}px`;
          if (portrait.style.getPropertyValue('--hero-shift') !== shift)
            portrait.style.setProperty('--hero-shift', shift);
        }
      });
    };
    const resize = () => {
      range = document.documentElement.scrollHeight - window.innerHeight;
      update();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', update);
    resize();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', resize);
      reduced.removeEventListener('change', update);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 601px)');
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    headerRef.current?.querySelector<HTMLAnchorElement>('nav a')?.focus({ preventScroll: true });
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setOpen(false);
    };
    window.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      window.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#home" onClick={() => setOpen(false)}>
        <span className="monogram" aria-hidden="true">
          jy.
        </span>
        <span className="brand-name">
          JAYCE YAP<span>AIA LIFE PLANNER</span>
        </span>
      </a>
      <nav
        className={open ? 'main-nav open' : 'main-nav'}
        aria-label="Main navigation"
        id="main-navigation"
      >
        {[
          ['Meet Jayce', 'about'],
          ['Your protection', 'protection'],
          ['The journal', 'journal'],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#contact" className="button nav-cta" onClick={() => setOpen(false)}>
          Let’s talk <Arrow />
        </a>
      </nav>
      <button
        className="menu-toggle icon-button"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <div className="scroll-progress" />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <h1 id="hero-heading">
          For the life
          <br />
          you’re <em>building.</em>
        </h1>
        <p className="hero-description">
          Medical cards. Critical illness. Life protection.
          <br className="desktop-break" /> A plan shaped around your life, with the details made
          clear.
        </p>
        <p className="hero-insight">
          <strong>A medical card helps with eligible treatment bills.</strong> Critical illness
          cover can provide a lump sum when a diagnosis meets the policy’s covered conditions.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="button">
            Let’s plan your next chapter <Arrow />
          </a>
          <a href="#check-in" className="text-link">
            Find your starting point <ArrowRight size={16} />
          </a>
        </div>
        <div className="hero-intro">
          <span className="intro-line" />
          <p>
            <strong>Jayce Yap Zi Wen</strong>
            <span>Your AIA Life Planner, here in Malaysia.</span>
          </p>
        </div>
        <a href="#about" className="scroll-cue">
          <span>
            <ArrowDown size={16} />
          </span>
          A little clarity. A lot more living.
        </a>
      </div>
      <div className="hero-visual">
        <div className="portrait-window">
          <img
            className="portrait"
            src="/images/portrait.webp"
            width="1536"
            height="1024"
            alt="Illustrative editorial portrait, awaiting Jayce’s own photograph"
            fetchPriority="high"
          />
          <div className="portrait-gradient" />
          <div className="portrait-caption">
            <p>
              Here for your
              <br />
              <em>what’s next.</em>
            </p>
          </div>
        </div>
        <span className="portrait-note">AI illustration - Jayce’s photo coming soon.</span>
        <div className="aia-seal">
          <strong>AIA</strong>
          <span>
            HEALTHIER, LONGER,
            <br />
            BETTER LIVES
          </span>
        </div>
        <div className="portrait-side">A LIFE WELL LIVED. A FUTURE WELL PLANNED.</div>
      </div>
      <div className="hero-bottom">
        <span>
          Thoughtful protection.
          <br />
          <strong>At every turning point.</strong>
        </span>
        <div>
          <ShieldCheck size={22} />
          <span>
            Understand
            <br />
            your cover
          </span>
        </div>
        <div>
          <FileText size={22} />
          <span>
            Find clarity
            <br />
            in the details
          </span>
        </div>
        <div>
          <Heart size={22} />
          <span>
            Plan around
            <br />
            your people
          </span>
        </div>
        <a href="#protection" aria-label="Explore your protection">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about" aria-labelledby="about-heading">
      <div className="about-grid">
        <h2 id="about-heading">
          Good insurance
          <br />
          starts with a<br />
          <em>real conversation.</em>
        </h2>
        <div className="about-copy">
          <p className="large-copy">
            Not a product list.
            <br />
            Not a one-size-fits-all plan.
            <br />
            You, and the life you want to live.
          </p>
          <p>
            I’m Jayce. I believe understanding your insurance should feel empowering. My approach
            starts with listening, making the details clear, and helping you ask the right
            questions.
          </p>
          <p>
            From your first medical card to a growing family, let’s make sense of what you have,
            what matters now, and what comes next.
          </p>
          <div className="signature-row">
            <span className="signature">Jayce</span>
            <a href={helloUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              Say hello <Arrow />
            </a>
          </div>
        </div>
      </div>
      <div className="belief-strip">
        <span>Clarity before commitment.</span>
        <span>Life before products.</span>
        <span>A conversation that starts with you.</span>
      </div>
    </section>
  );
}

function Protection({ onTopic }: { onTopic: (topic: string) => void }) {
  const [active, setActive] = useState(0);
  const selected = coverage[active];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section
      className="protection section-pad"
      id="protection"
      aria-labelledby="protection-heading"
    >
      <div className="section-heading">
        <h2 id="protection-heading">
          One life.
          <br />
          <em>Thoughtfully protected.</em>
        </h2>
        <p>
          Different needs. Connected decisions.
          <br />
          Explore the pieces of a considered protection plan.
        </p>
      </div>
      <div className="coverage-tabs" role="tablist" aria-label="Protection areas">
        {coverage.map((item, i) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${item.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === 'ArrowRight') next = (i + 1) % coverage.length;
              else if (e.key === 'ArrowLeft') next = (i + coverage.length - 1) % coverage.length;
              else if (e.key === 'Home') next = 0;
              else if (e.key === 'End') next = coverage.length - 1;
              else return;
              e.preventDefault();
              setActive(next);
              tabs.current[next]?.focus();
            }}
          >
            {item.label}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div
        className="coverage-panel"
        role="tabpanel"
        id={`panel-${selected.id}`}
        aria-labelledby={`tab-${selected.id}`}
        tabIndex={0}
      >
        <div
          className={`protection-art layer-${active}`}
          aria-hidden="true"
          style={{ '--layer-color': selected.color } as CSSProperties}
        >
          <span className="art-caption">A PLAN THAT FITS AROUND YOU</span>
          <div className="layer-scene">
            {coverage.map((item, index) => {
              const rank = (index - active + coverage.length) % coverage.length;
              const CardIcon = [ShieldCheck, Heart, Users, FileText][index];
              return (
                <div
                  key={item.id}
                  className="protection-layer"
                  data-active={index === active}
                  style={
                    {
                      '--card-rank': rank,
                      background: item.color,
                      zIndex: coverage.length - rank,
                    } as CSSProperties
                  }
                >
                  <span>{item.short}</span>
                  <CardIcon />
                  <span className="layer-word">
                    {['Health,', 'Recovery,', 'Family,', 'Clarity,'][index]}
                    <br />
                    <em>{['covered.', 'supported.', 'considered.', 'renewed.'][index]}</em>
                  </span>
                </div>
              );
            })}
            <span className="layer-ground" />
          </div>
          <span className="art-bottom">
            <span className="tiny-cross">+</span> YOUR LIFE IS THE STARTING POINT.
          </span>
        </div>
        <div className="coverage-copy" key={selected.id}>
          <h3>
            {selected.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h3>
          <p>{selected.description}</p>
          <ul>
            {selected.points.map((point) => (
              <li key={point}>
                <Check size={15} />
                {point}
              </li>
            ))}
          </ul>
          <div className="good-question">
            <span>A GOOD QUESTION TO START WITH</span>
            <p>“{selected.question}”</p>
          </div>
          <a className="text-link" href="#contact" onClick={() => onTopic(selected.label)}>
            Let’s talk about {active === 3 ? 'your policies' : 'your cover'} <Arrow />
          </a>
          <a
            className="source-link"
            href={selected.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore AIA Malaysia’s information <ExternalLink size={12} />
          </a>
        </div>
      </div>
      <p className="fine-print protection-disclaimer">
        A starting point for understanding, not a personalised recommendation. Benefits,
        eligibility, limits, and exclusions depend on the selected policy.
      </p>
    </section>
  );
}

const quizQuestions = [
  {
    title: 'What chapter are you in?',
    options: ['Building my career', 'Growing my family', 'Planning what’s next'],
  },
  {
    title: 'What’s on your mind?',
    options: [
      'Unexpected medical bills',
      'Income during recovery',
      'People who depend on me',
      'Making sense of my policies',
    ],
  },
  {
    title: 'How clear is your current cover?',
    options: [
      'I’m starting from scratch',
      'I have cover, but I’m unsure',
      'I’d like a second look',
    ],
  },
];

function PlanningCheck({
  onResult,
  onReset,
}: {
  onResult: (topic: string, summary: string) => void;
  onReset: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) heading.current?.focus({ preventScroll: true });
  }, [step]);
  const resultIndex = [0, 1, 2, 3][quizQuestions[1].options.indexOf(answers[1])] ?? 3;
  const result = coverage[resultIndex];
  const summary = answers.join(' · ');
  const changeStep = (next: number) => {
    started.current = true;
    setStep(next);
  };
  return (
    <section className="check-in section-pad" id="check-in" aria-labelledby="check-heading">
      <div className="check-intro">
        <h2 id="check-heading">
          A little check-in.
          <br />
          <em>A clearer next step.</em>
        </h2>
        <p>
          You don’t have to have it all figured out.
          <br />
          Three simple questions. A place to begin.
        </p>
        <span className="check-meta">
          <Clock3 size={15} /> ABOUT A MINUTE <span /> NO CONTACT DETAILS NEEDED
        </span>
        <div className="check-flower" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ '--petal': i } as CSSProperties} />
          ))}
        </div>
      </div>
      <div className="quiz">
        <div
          className="quiz-progress"
          role="progressbar"
          aria-label="Planning check progress"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={step}
          aria-valuetext={step === 3 ? 'Complete' : `Question ${step + 1} of 3`}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className={i <= step ? 'complete' : ''} />
          ))}
        </div>
        {step < 3 ? (
          <>
            <div className="quiz-step">QUESTION {step + 1} OF 3</div>
            <h3 ref={heading} tabIndex={-1}>
              {quizQuestions[step].title}
            </h3>
            <div className="quiz-options" role="radiogroup" aria-label={quizQuestions[step].title}>
              {quizQuestions[step].options.map((option) => (
                <label
                  key={option}
                  className={answers[step] === option ? 'quiz-option selected' : 'quiz-option'}
                >
                  <input
                    type="radio"
                    name={`question-${step}`}
                    value={option}
                    checked={answers[step] === option}
                    onChange={() =>
                      setAnswers((current) => {
                        const next = [...current];
                        next[step] = option;
                        return next;
                      })
                    }
                  />
                  <span>{option}</span>
                  <span className="radio-mark">
                    {answers[step] === option && <Check size={13} />}
                  </span>
                </label>
              ))}
            </div>
            <div className="quiz-navigation">
              {step > 0 ? (
                <button className="text-link" onClick={() => changeStep(step - 1)}>
                  <ChevronLeft size={15} /> Back
                </button>
              ) : (
                <span className="quiz-private">Just between you and this page.</span>
              )}
              <button
                className="button"
                disabled={!answers[step]}
                onClick={() => changeStep(step + 1)}
              >
                {step === 2 ? 'See my starting point' : 'Next question'} <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-result">
            <span className="result-check">
              <Check size={23} />
            </span>
            <h3 ref={heading} tabIndex={-1}>
              Let’s start with
              <br />
              <em>{result.label.toLowerCase()}.</em>
            </h3>
            <p>
              Based on what’s on your mind, this is a useful topic for your first conversation.
              We’ll look at the full picture together.
            </p>
            <div className="result-question">{result.question}</div>
            <a href="#contact" className="button" onClick={() => onResult(result.label, summary)}>
              Bring this to our conversation <Arrow />
            </a>
            <button
              className="text-link restart"
              onClick={() => {
                setAnswers([]);
                onReset();
                changeStep(0);
              }}
            >
              Start again
            </button>
            <p className="fine-print">
              This is a conversation starter, not a needs assessment or product recommendation. Your
              answers stay in this browser until you choose to share them on WhatsApp.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-pad" aria-labelledby="process-heading">
      <div className="section-heading">
        <h2 id="process-heading">
          Less overwhelming.
          <br />
          <em>More understanding.</em>
        </h2>
        <p>
          A thoughtful plan begins with a simple process.
          <br />
          Here’s how we’ll get there, together.
        </p>
      </div>
      <div className="process-grid">
        {[
          [
            '01',
            'First, we listen.',
            'Your life, your priorities, your questions. A real conversation about what matters to you.',
          ],
          [
            '02',
            'Then, we make sense of it.',
            'We look at your existing protection, unpack the details, and discuss where things could fit better.',
          ],
          [
            '03',
            'You choose your next step.',
            'Clear explanations and time to consider. A decision made with understanding, at your pace.',
          ],
        ].map(([num, title, copy]) => (
          <div className="process-step" key={num}>
            <div className="step-line">
              <span>{num}</span>
              <ArrowRight size={21} />
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Journal() {
  const [article, setArticle] = useState<number | null>(null);
  const detail = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (article !== null) {
      detail.current?.focus({ preventScroll: true });
      detail.current?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    }
  }, [article]);
  return (
    <section className="journal section-pad" id="journal" aria-labelledby="journal-heading">
      <div className="section-heading">
        <h2 id="journal-heading">
          A little knowledge.
          <br />
          <em>A lot of confidence.</em>
        </h2>
        <p>
          Insurance, in everyday language.
          <br />
          Notes for the decisions that matter.
        </p>
      </div>
      <div className="journal-grid">
        {articles.map((item, i) => (
          <button
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="journal-card"
            key={item.title}
            aria-expanded={article === i}
            aria-controls="article-detail"
            onClick={() => setArticle(article === i ? null : i)}
          >
            <div className="journal-image">
              <img src={item.image} alt={item.alt} width="600" height="440" loading="lazy" />
              <span className="journal-open">
                <Arrow />
              </span>
            </div>
            <div className="article-meta">
              <span>{item.category}</span>
              <span>{item.time}</span>
            </div>
            <h3>{item.title}</h3>
            <span className="journal-read">
              Read the note <ArrowRight size={15} />
            </span>
          </button>
        ))}
      </div>
      {article !== null && (
        <div className="article-detail" id="article-detail" ref={detail} tabIndex={-1}>
          <button
            className="icon-button article-close"
            aria-label="Close article"
            onClick={() => {
              const previous = article;
              setArticle(null);
              requestAnimationFrame(() => {
                cards.current[previous]?.focus({ preventScroll: true });
                cards.current[previous]?.scrollIntoView({
                  block: 'start',
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                });
              });
            }}
          >
            <X />
          </button>
          <h3>{articles[article].title}</h3>
          <p className="article-intro">{articles[article].intro}</p>
          {articles[article].paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a
            className="source-link"
            href={articles[article].source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Further reading: AIA Malaysia <ExternalLink size={13} />
          </a>
          <p className="fine-print">
            General information only. A recommendation requires a review of your individual
            circumstances and the relevant policy terms.
          </p>
          <a className="text-link" href="#contact">
            Talk through your questions <Arrow />
          </a>
        </div>
      )}
    </section>
  );
}

function Faq() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="faq section-pad" aria-labelledby="faq-heading">
      <div>
        <h2 id="faq-heading">
          On your mind?
          <br />
          <em>Let’s clear it up.</em>
        </h2>
        <p>A few things you might be wondering.</p>
        <a href={helloUrl} target="_blank" rel="noopener noreferrer" className="text-link">
          Ask me something else <Arrow />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div className={`faq-item ${active === i ? 'expanded' : ''}`} key={item.q}>
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={`faq-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                {item.q}
                <Plus size={18} />
              </button>
            </h3>
            <div id={`faq-${i}`} className="faq-answer" hidden={active !== i}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const malaysiaDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kuala_Lumpur',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const readableDate = new Intl.DateTimeFormat('en-MY', { dateStyle: 'long' });

function Contact({
  topic,
  summary,
  onTopic,
  onRemoveSummary,
}: {
  topic: string;
  summary: string;
  onTopic: (topic: string) => void;
  onRemoveSummary: () => void;
}) {
  const [name, setName] = useState('');
  const [format, setFormat] = useState('Online');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Flexible');
  const [consent, setConsent] = useState(false);
  const [review, setReview] = useState(false);
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);
  const reviewTitle = useRef<HTMLHeadingElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const editing = useRef(false);
  const topicField = useRef<HTMLSelectElement>(null);
  const getToday = () => malaysiaDate.format(new Date());
  const formattedDate = date ? readableDate.format(new Date(`${date}T12:00:00`)) : 'Flexible';
  const message = `Hi Jayce, I'm ${name.trim()}. I'd like to arrange a conversation about ${topic.toLowerCase()}.\n\nPreferred format: ${format}\nPreferred date: ${formattedDate}\nPreferred time: ${time} (Malaysia time)${summary ? `\n\nMy planning check: ${summary}` : ''}\n\nPlease let me know what works for you. I understand this is a request, subject to confirmation.`;
  useEffect(() => {
    if (review) reviewTitle.current?.focus({ preventScroll: true });
    else if (editing.current) {
      nameField.current?.focus();
      editing.current = false;
    }
  }, [review]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter at least two characters for your name.');
      nameField.current?.focus();
      return;
    }
    if (date && date < getToday()) {
      setError('Please choose today or a future date, or leave it blank to stay flexible.');
      return;
    }
    if (!consent) {
      setError('Please agree to share these details with Jayce on WhatsApp.');
      return;
    }
    setError('');
    setReview(true);
  };
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-heading">
      <div className="contact-copy">
        <h2 id="contact-heading">
          Your next chapter
          <br />
          starts with
          <br />
          <em>a conversation.</em>
        </h2>
        <p>
          Bring your questions. Bring your plans.
          <br />
          Let’s make the future feel a little clearer.
        </p>
        <div className="contact-details">
          <span>
            <Clock3 size={17} /> A focused first conversation
          </span>
          <span>
            <Video size={17} /> Online, by phone, or in person
          </span>
          <span>
            <MessageCircle size={17} /> Confirm the details with me on WhatsApp
          </span>
        </div>
        <a className="direct-contact" href={helloUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={20} />
          <span>
            Prefer to message directly?<strong>{profile.phone}</strong>
          </span>
          <Arrow />
        </a>
      </div>
      <div className="booking">
        {!review ? (
          <form onSubmit={submit}>
            <h3>Let’s find a time for you.</h3>
            <p className="booking-intro">A few details, then we’ll continue on WhatsApp.</p>
            <label className="field">
              Your name
              <input
                type="text"
                ref={nameField}
                name="name"
                autoComplete="name"
                placeholder="What should I call you?"
                required
                minLength={2}
                maxLength={80}
                value={name}
                aria-invalid={!!error && name.trim().length < 2}
                aria-describedby={error ? 'booking-error' : undefined}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
              />
            </label>
            <label className="field">
              What would you like to talk about?
              <span className="select-wrap">
                <select
                  ref={topicField}
                  value={topic}
                  onChange={(e) => onTopic(e.target.value)}
                  name="topic"
                >
                  {['Not sure where to start', ...coverage.map((c) => c.label)].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </span>
            </label>
            <fieldset className="format-options">
              <legend>How would you like to meet?</legend>
              {['Online', 'Phone call', 'In person'].map((f) => (
                <label key={f} className={format === f ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="format"
                    value={f}
                    checked={format === f}
                    onChange={() => setFormat(f)}
                  />
                  {f}
                </label>
              ))}
            </fieldset>
            <div className="field-row">
              <label className="field">
                Preferred date <span className="optional">(optional)</span>
                <input
                  name="date"
                  aria-label="Preferred date (optional)"
                  type="date"
                  min={getToday()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="field">
                Time of day
                <span className="select-wrap">
                  <select name="time" value={time} onChange={(e) => setTime(e.target.value)}>
                    {['Flexible', 'Morning', 'Afternoon', 'Evening'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>
            </div>
            <p className="time-note">
              Malaysia time (MYT). Your preferred time is subject to confirmation.
            </p>
            {summary && (
              <div className="attached-summary">
                <Check size={15} /> Your planning check is included.
                <button
                  type="button"
                  onClick={() => {
                    onRemoveSummary();
                    topicField.current?.focus();
                  }}
                >
                  Remove check-in
                </button>
              </div>
            )}
            <label className="consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span>
                I agree to share these details with Jayce on WhatsApp so she can respond to my
                request.
              </span>
            </label>
            {error && (
              <p className="form-error" id="booking-error" role="alert">
                {error}
              </p>
            )}
            <button className="button booking-submit" type="submit">
              Prepare my conversation <Arrow />
            </button>
            <p className="booking-note">Nothing is sent until you press send in WhatsApp.</p>
          </form>
        ) : (
          <div className="booking-review">
            <span className="review-icon">
              <CalendarDays size={27} />
            </span>
            <h3 ref={reviewTitle} tabIndex={-1}>
              Your conversation,
              <br />
              <em>ready to begin.</em>
            </h3>
            <p>Hi {name.trim()}. Here’s the request you’ll share with Jayce.</p>
            <dl>
              <div>
                <dt>Let’s talk about</dt>
                <dd>{topic}</dd>
              </div>
              <div>
                <dt>How we’ll meet</dt>
                <dd>{format}</dd>
              </div>
              <div>
                <dt>Your preference</dt>
                <dd>
                  {formattedDate} · {time}
                  <br />
                  <small>Malaysia time (MYT)</small>
                </dd>
              </div>
            </dl>
            {summary && <p className="review-summary">Your planning check: {summary}</p>}
            <a
              className="button booking-submit"
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpened(true)}
            >
              Continue on WhatsApp <MessageCircle size={18} />
            </a>
            <p className="booking-note" role="status">
              {opened
                ? 'WhatsApp opens in a new tab. Please send your message there. Your appointment is not confirmed until Jayce replies.'
                : 'WhatsApp opens with your message ready. Review it and press send. Jayce will confirm availability with you.'}
            </p>
            <button
              className="text-link"
              onClick={() => {
                editing.current = true;
                setReview(false);
                setOpened(false);
              }}
            >
              <ChevronLeft size={15} /> Edit my details
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const [privacy, setPrivacy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (privacy) dialog.current?.showModal();
    else dialog.current?.close();
  }, [privacy]);
  return (
    <>
      <footer className="footer section-pad">
        <div className="footer-main">
          <a className="footer-brand" href="#home">
            Jayce Yap<span>For a life well lived.</span>
          </a>
          <div className="footer-links">
            <a href="#about">Meet Jayce</a>
            <a href="#protection">Your protection</a>
            <a href="#journal">The journal</a>
            <a href="#contact">
              Let’s talk <Arrow />
            </a>
          </div>
          <div className="footer-aia">
            <strong>AIA</strong>
            <span>
              LIFE PLANNER
              <br />
              MALAYSIA
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jayce Yap Zi Wen.</span>
          <button onClick={() => setPrivacy(true)}>Privacy & your information</button>
          <a href="#home">
            Back to top <ArrowUpRight size={13} />
          </a>
        </div>
        <p className="footer-disclaimer">
          Personal portfolio of Jayce Yap Zi Wen. This is not the official AIA Malaysia website.
          Information here is general and does not constitute a personalised insurance
          recommendation. Coverage is subject to policy terms, conditions, exclusions, and
          underwriting. The portrait is an AI-generated illustration pending Jayce’s own photo.
        </p>
      </footer>
      <dialog
        className="privacy-dialog"
        ref={dialog}
        onCancel={() => setPrivacy(false)}
        onClick={(e) => {
          if (e.target !== dialog.current) return;
          const bounds = dialog.current.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            setPrivacy(false);
        }}
        aria-labelledby="privacy-heading"
      >
        <button
          className="icon-button"
          onClick={() => setPrivacy(false)}
          aria-label="Close privacy information"
        >
          <X />
        </button>
        <h2 id="privacy-heading">
          Your information.
          <br />
          <em>Your choice.</em>
        </h2>
        <p>
          Your planning-check answers and consultation details stay in this page’s memory. They are
          not saved to a database or sent to Jayce automatically.
        </p>
        <p>
          When you continue on WhatsApp, your details are included in a message you can review and
          send. Opening WhatsApp shares the prepared message with that service. WhatsApp’s own
          privacy terms apply.
        </p>
        <p>
          Only share information you are comfortable including in an initial enquiry. Please do not
          include medical reports, identity numbers, or policy documents here.
        </p>
        <p>
          For questions about information you have shared, contact Jayce at{' '}
          <a href={helloUrl} target="_blank" rel="noopener noreferrer">
            {profile.phone}
          </a>
          .
        </p>
        <button className="button" onClick={() => setPrivacy(false)}>
          Got it <Check size={16} />
        </button>
      </dialog>
    </>
  );
}

function FloatingContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return visible ? (
    <a
      className="floating-contact"
      href={helloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask Jayce on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>Ask Jayce</span>
    </a>
  ) : null;
}

export default function App() {
  useLayoutEffect(() => {
    if (!window.location.hash) return;
    try {
      document
        .getElementById(decodeURIComponent(window.location.hash.slice(1)))
        ?.scrollIntoView({ behavior: 'instant', block: 'start' });
    } catch {
      /* A malformed external fragment must not interrupt the page. */
    }
  }, []);
  usePageMotion();
  const [topic, setTopic] = useState('Not sure where to start');
  const [summary, setSummary] = useState('');
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroExperience portrait={<Hero />} onTopic={setTopic} />
        <About />
        <Protection onTopic={setTopic} />
        <PlanningCheck
          onReset={() => setSummary('')}
          onResult={(nextTopic, nextSummary) => {
            setTopic(nextTopic);
            setSummary(nextSummary);
          }}
        />
        <Process />
        <Journal />
        <Faq />
        <Contact
          topic={topic}
          summary={summary}
          onTopic={setTopic}
          onRemoveSummary={() => setSummary('')}
        />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
