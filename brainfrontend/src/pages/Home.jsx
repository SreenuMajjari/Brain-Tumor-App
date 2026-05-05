import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NeuralCanvas from '../components/NeuralCanvas';
import './Home.css';



/* ─────────────────────────────────────────
   2. Typewriter Hook
───────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─────────────────────────────────────────
   3. Animated Counter
───────────────────────────────────────── */
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   4. Tilt Card Hook
───────────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const card = ref.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * -20;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  }, []);
  return { ref, handleMove, handleLeave };
}

/* ─────────────────────────────────────────
   5. Scroll-reveal Hook
───────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────
   Feature Card (tilt + reveal)
───────────────────────────────────────── */
function FeatureCard({ icon, title, desc, color, delay = 0 }) {
  const { ref: tiltRef, handleMove, handleLeave } = useTilt();
  const { ref: revealRef, visible } = useReveal();

  return (
    <div
      ref={revealRef}
      className={`feature-card-reveal ${visible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={tiltRef}
        className="glass-feature-card"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="icon-wrapper" style={{ '--glow-color': color }}>
          <span className="icon">{icon}</span>
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="card-shine"></div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Home Component
───────────────────────────────────────── */
const TYPEWRITER_WORDS = [
  'Glioma Detection.',
  'Meningioma Analysis.',
  'Pituitary Classification.',
  'Anomaly Screening.',
];

const STATS = [
  { value: 98,   suffix: '%', label: 'Classification Accuracy' },
  { value: 4,    suffix: '+', label: 'Tumor Types Detected' },
  { value: 500,  suffix: 'ms', label: 'Avg. Inference Speed' },
  { value: 1248, suffix: '',  label: 'Scans Processed' },
];

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time Inference',
    desc: 'Autoencoder-extracted features fed into an SVM pipeline deliver classification results in under 500 ms.',
    color: '#06B6D4',
    delay: 0,
  },
  {
    icon: '🧠',
    title: 'Deep Learning Pipeline',
    desc: 'A convolutional autoencoder compresses MRI scans into dense feature embeddings for maximum signal fidelity.',
    color: '#8B5CF6',
    delay: 120,
  },
  {
    icon: '🔒',
    title: 'Zero-Storage Privacy',
    desc: 'Uploaded scans are processed in-memory and never written to disk, ensuring complete patient confidentiality.',
    color: '#F59E0B',
    delay: 240,
  },
];

export default function Home() {
  const typeText = useTypewriter(TYPEWRITER_WORDS, 75, 2200);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.1);
  const { ref: trustRef, visible: trustVisible } = useReveal(0.2);

  return (
    <div className="home-wrapper">
      {/* ── Canvas Background ── */}
      <NeuralCanvas opacity={0.5} />

      {/* ── Ambient Orbs ── */}
      <div className="orb orb-blue" />
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="hero-section">
        <div className="hero-inner">
          <span className="badge">
            <span className="badge-dot" /> Deep Learning · MRI Classification
          </span>

          <h1 className="hero-title">
            Precision Diagnostics<br />
            for&nbsp;
            <span className="typewriter">
              {typeText}
              <span className="cursor">|</span>
            </span>
          </h1>

          <p className="hero-sub">
            BrainCare leverages a trained convolutional autoencoder and SVM
            classifier to deliver fast, accurate brain tumor classification
            from MRI scans — right in your browser.
          </p>

          <div className="hero-cta">
            <Link to="/analysis" className="btn-glow">
              Launch Analysis &nbsp;→
            </Link>
            <Link to="/diseases" className="btn-outline-hero">
              Browse Pathology
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section
        ref={statsRef}
        className={`stats-section ${statsVisible ? 'stats-visible' : ''}`}
      >
        {STATS.map((s) => (
          <div key={s.label} className="stat-pill">
            <p className="stat-num">
              <CountUp target={s.value} suffix={s.suffix} />
            </p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ════════════════════ FEATURES ════════════════════ */}
      <section className="features-section">
        <div className="section-header">
          <h2>How BrainCare Works</h2>
          <p>A transparent look at the deep learning pipeline powering every diagnosis.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ════════════════════ TRUST / CTA ════════════════════ */}
      <section
        ref={trustRef}
        className={`trust-section ${trustVisible ? 'trust-visible' : ''}`}
      >
        <div className="trust-glass">
          <h2>Ready to Analyze?</h2>
          <p>
            Upload any brain MRI scan and receive a detailed classification
            report powered by our deep learning model — completely free.
          </p>
          <Link to="/analysis" className="btn-glow">
            Start Analyzing &nbsp;→
          </Link>
        </div>
      </section>
    </div>
  );
}
