import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import './life-chapters.css';

const stages = [
  {
    name: 'Starting out',
    title: 'A little independence.\nA lot of possibility.',
    thought: 'Your first job. Your own plans. A good time to understand what protects you.',
    questions: [
      'What does my employer already cover?',
      'What would I pay for treatment myself?',
      'What budget can I comfortably maintain?',
    ],
    topic: 'Medical protection',
    focus: 'Make sense of your medical cover.',
  },
  {
    name: 'Growing a family',
    title: 'More love.\nMore to think about.',
    thought: 'When someone depends on you, the conversation grows beyond your own needs.',
    questions: [
      'Who depends on my income?',
      'Which commitments would continue without it?',
      'Are my benefits and nominations up to date?',
    ],
    topic: 'Life & family',
    focus: 'Put your people at the centre.',
  },
  {
    name: 'A new chapter',
    title: 'Life has changed.\nHas your cover?',
    thought: 'A new role, a new home, or a different priority. Make room for a fresh look.',
    questions: [
      'What has changed since my last review?',
      'Where do my existing policies overlap?',
      'Does the cost still fit my budget?',
    ],
    topic: 'Policy review',
    focus: 'Start with what you already have.',
  },
];

export default function LifeChapters({ onTopic }: { onTopic: (topic: string) => void }) {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <section className="life-chapters" aria-labelledby="chapters-heading">
      <div className="chapters-intro">
        <h1 id="chapters-heading">
          Life moves.
          <br />
          Your plan
          <br />
          should, <em>too.</em>
        </h1>
        <p>
          Insurance that makes sense starts with
          <br className="desktop-break" /> the life you’re living.
        </p>
        <div className="chapter-identity">
          <span className="signature">Jayce</span>
          <span>
            <strong>Jayce Yap Zi Wen</strong>AIA Life Planner · Malaysia
          </span>
        </div>
      </div>
      <div className="chapter-spread" aria-live="polite" aria-atomic="true">
        <div className="chapter-folio">
          <span>{stage.name}</span>
          <span>{String(active + 1).padStart(2, '0')} / 03</span>
        </div>
        <div className="chapter-story" key={active}>
          <h2>
            {stage.title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p>{stage.thought}</p>
          <ul>
            {stage.questions.map((question) => (
              <li key={question}>
                <Check size={15} />
                {question}
              </li>
            ))}
          </ul>
          <p className="chapter-focus">{stage.focus}</p>
        </div>
        <a className="button chapter-book" href="#contact" onClick={() => onTopic(stage.topic)}>
          Plan for this chapter <ArrowUpRight size={18} />
        </a>
        <a className="chapter-alternative" href="#check-in">
          Not sure where to begin? <ArrowRight size={16} />
        </a>
      </div>
      <div className="life-timeline" role="group" aria-label="Choose your life chapter">
        {stages.map((item, index) => (
          <button key={item.name} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span className="timeline-marker" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item.name}</span>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <p className="chapters-footnote">
        A starting point for a conversation. Your needs and policy terms shape the details.
      </p>
    </section>
  );
}
