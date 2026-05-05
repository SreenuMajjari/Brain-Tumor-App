import React, { useState, useRef, useEffect } from 'react';
import NeuralCanvas from '../components/NeuralCanvas';
import './Diseases.css';

/* ────────────────────────────────────────────
   Disease Data
──────────────────────────────────────────── */
const DISEASES = [
  {
    id: 'glioma',
    icon: '🦠',
    name: 'Glioma',
    tagline: 'Tumor of the Glial Cells',
    color: '#F43F5E',
    gradient: 'linear-gradient(135deg,#F43F5E,#FB7185)',
    severity: 85,
    severityLabel: 'High Risk',
    summary: 'Gliomas form in the supportive glial cells of the brain and spinal cord. They are among the most common and aggressive primary brain tumors.',
    whatIsIt: 'Glial cells form the "scaffolding" of the brain — they hold nerve cells in place and help them function. When these cells mutate and grow uncontrollably, a glioma forms. They can press against brain tissue, disrupting normal functions.',
    symptoms: ['Persistent headaches (worse in the morning)', 'Seizures or convulsions', 'Memory and personality changes', 'Vision or speech difficulties', 'Weakness on one side of the body'],
    grades: [
      { label: 'Grade I–II', desc: 'Slow-growing, often manageable', color: '#10B981' },
      { label: 'Grade III', desc: 'Moderately aggressive', color: '#F59E0B' },
      { label: 'Grade IV (GBM)', desc: 'Most aggressive form', color: '#F43F5E' },
    ],
    treatment: 'Surgery, radiation therapy, and chemotherapy — often combined. Bevacizumab may be used for recurrent cases.',
    survival: '5-year survival varies from 95% (Grade I) to <10% (Grade IV GBM)',
  },
  {
    id: 'meningioma',
    icon: '🧠',
    name: 'Meningioma',
    tagline: 'Tumor of the Brain Lining',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg,#F59E0B,#FCD34D)',
    severity: 45,
    severityLabel: 'Moderate Risk',
    summary: 'Meningiomas arise from the meninges — the three-layered protective membrane surrounding the brain and spinal cord. Most are benign and slow-growing.',
    whatIsIt: 'Imagine three thin sheets of protective tissue wrapping your brain. When cells in these sheets grow abnormally, a meningioma develops. Since they grow slowly and stay in one place, many are discovered by accident during brain imaging for other reasons.',
    symptoms: ['Gradual hearing or vision loss', 'Memory problems', 'Loss of smell', 'Arm or leg weakness', 'Headaches that worsen over time'],
    grades: [
      { label: 'Grade I (Benign)', desc: '80–85% of cases, non-cancerous', color: '#10B981' },
      { label: 'Grade II (Atypical)', desc: 'Higher recurrence risk', color: '#F59E0B' },
      { label: 'Grade III (Malignant)', desc: 'Aggressive, rare (<3%)', color: '#F43F5E' },
    ],
    treatment: 'Many require only watchful waiting. When treatment is needed: surgery and/or stereotactic radiosurgery (Gamma Knife).',
    survival: '5-year survival: ~70–80% for atypical; >90% for benign',
  },
  {
    id: 'pituitary',
    icon: '⚗️',
    name: 'Pituitary Tumor',
    tagline: 'Tumor of the Master Gland',
    color: '#818CF8',
    gradient: 'linear-gradient(135deg,#6366F1,#818CF8)',
    severity: 30,
    severityLabel: 'Lower Risk',
    summary: 'Pituitary tumors (adenomas) develop in the pea-sized gland at the base of the brain that controls most of your body\'s hormones.',
    whatIsIt: 'The pituitary gland is your body\'s "control center" — it tells other glands what hormones to produce. A tumor here can either overproduce certain hormones (causing body-wide effects) or press on the optic nerve (affecting vision). The good news: the vast majority are completely non-cancerous.',
    symptoms: ['Unexplained weight changes', 'Vision loss or double vision', 'Headaches around the eyes', 'Hormonal imbalances (fatigue, infertility)', 'Abnormal menstrual cycles or erectile dysfunction'],
    grades: [
      { label: 'Microadenoma', desc: '<10mm, very common', color: '#10B981' },
      { label: 'Macroadenoma', desc: '>10mm, may press on nerves', color: '#F59E0B' },
      { label: 'Invasive', desc: 'Rare, grows into surrounding tissue', color: '#F43F5E' },
    ],
    treatment: 'Medications to control hormone overproduction, minimally invasive transsphenoidal surgery, or radiation for residual tumors.',
    survival: 'Excellent prognosis. 5-year survival >95% for most adenomas.',
  },
  {
    id: 'no_tumor',
    icon: '✅',
    name: 'No Tumor Detected',
    tagline: 'Healthy Brain Scan',
    color: '#10B981',
    gradient: 'linear-gradient(135deg,#10B981,#34D399)',
    severity: 0,
    severityLabel: 'No Risk',
    summary: 'A healthy brain scan shows normal tissue density, no structural abnormalities, and no signs of abnormal cellular growth.',
    whatIsIt: 'When our deep learning model classifies a scan as "No Tumor", it means the MRI shows tissue patterns consistent with a healthy brain baseline. The autoencoder has detected no irregular cell formations, mass effect, or contrast enhancement that would indicate a tumor.',
    symptoms: ['No neurological deficits detected', 'Normal ventricle size', 'Symmetric brain structure', 'No midline shift', 'Normal white and grey matter ratio'],
    grades: [
      { label: 'Normal Baseline', desc: 'Matches healthy population average', color: '#10B981' },
      { label: 'High Confidence', desc: 'Strong model certainty', color: '#10B981' },
      { label: 'Recommend Follow-up', desc: 'If symptoms persist, consult a specialist', color: '#F59E0B' },
    ],
    treatment: 'No immediate treatment required. Regular annual screening is recommended for individuals with a family history of brain tumors.',
    survival: 'Normal life expectancy with routine monitoring.',
  },
];

/* ────────────────────────────────────────────
   Animated Wave SVG
──────────────────────────────────────────── */
function AnimatedWave({ color }) {
  return (
    <div className="wave-container">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="wave-svg">
        <path
          d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.15"
          className="wave wave-1"
        />
        <path
          d="M0,80 C200,40 400,100 600,70 C800,40 1000,90 1200,60 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.1"
          className="wave wave-2"
        />
        <path
          d="M0,90 C300,60 500,110 700,80 C900,50 1100,100 1200,70 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.08"
          className="wave wave-3"
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────
   Severity Meter
──────────────────────────────────────────── */
function SeverityMeter({ value, color, label }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(value), 200);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="severity-block">
      <div className="severity-label-row">
        <span>Risk Level</span>
        <span style={{ color }}>{label}</span>
      </div>
      <div className="severity-track">
        <div
          className="severity-fill"
          style={{ width: `${width}%`, background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Disease Detail Modal / Expanded Panel
──────────────────────────────────────────── */
function DiseaseDetail({ disease, onClose }) {
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Wave background */}
        <AnimatedWave color={disease.color} />

        {/* Header */}
        <div className="detail-header" style={{ borderColor: disease.color }}>
          <div className="detail-icon" style={{ background: `${disease.color}22`, border: `1px solid ${disease.color}44` }}>
            {disease.icon}
          </div>
          <div>
            <h2 style={{ color: '#FFFFFF' }}>{disease.name}</h2>
            <p className="detail-tagline" style={{ color: disease.color }}>{disease.tagline}</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="detail-body">
          {/* Summary */}
          <div className="detail-section">
            <p className="detail-summary">{disease.summary}</p>
          </div>

          {/* Severity */}
          <SeverityMeter value={disease.severity} color={disease.color} label={disease.severityLabel} />

          {/* Plain-English explanation */}
          <div className="detail-section explain-box" style={{ borderColor: `${disease.color}33`, background: `${disease.color}0D` }}>
            <h3>💡 In Simple Terms</h3>
            <p>{disease.whatIsIt}</p>
          </div>

          {/* Two columns: Symptoms + Grades */}
          <div className="detail-two-col">
            <div className="detail-section">
              <h3>⚠️ Common Symptoms</h3>
              <ul className="detail-list">
                {disease.symptoms.map((s, i) => (
                  <li key={i} style={{ animationDelay: `${i * 80}ms` }}>
                    <span className="list-dot" style={{ background: disease.color }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>📊 Classification Grades</h3>
              <div className="grade-list">
                {disease.grades.map((g, i) => (
                  <div key={i} className="grade-item">
                    <span className="grade-badge" style={{ background: `${g.color}22`, color: g.color, border: `1px solid ${g.color}44` }}>
                      {g.label}
                    </span>
                    <span className="grade-desc">{g.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="detail-section treat-box">
            <h3>💊 Treatment Approaches</h3>
            <p>{disease.treatment}</p>
          </div>

          {/* Survival */}
          <div className="detail-section survival-box" style={{ borderColor: `${disease.color}44` }}>
            <span className="survival-label">📈 Prognosis</span>
            <p>{disease.survival}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Disease Card
──────────────────────────────────────────── */
function DiseaseCard({ disease, onClick }) {
  return (
    <div className="disease-card" onClick={() => onClick(disease)}
      style={{ '--card-color': disease.color }}>
      <div className="card-top">
        <div className="d-icon" style={{ background: `${disease.color}18` }}>{disease.icon}</div>
        <span className="risk-chip" style={{ color: disease.color, background: `${disease.color}18`, border: `1px solid ${disease.color}33` }}>
          {disease.severityLabel}
        </span>
      </div>
      <h3>{disease.name}</h3>
      <p className="card-tagline">{disease.tagline}</p>
      <p className="card-summary">{disease.summary.slice(0, 110)}…</p>
      <div className="card-mini-meter">
        <div className="mini-fill" style={{ width: `${disease.severity}%`, background: disease.gradient }} />
      </div>
      <button className="card-cta" style={{ color: disease.color }}>
        Learn more →
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Diseases Page
──────────────────────────────────────────── */
export default function Diseases() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="diseases-wrapper">
      <NeuralCanvas opacity={0.35} />

      {/* Ambient orbs */}
      <div className="orb orb-blue"   style={{ width: 400, height: 400, top: -80, left: -80 }} />
      <div className="orb orb-violet" style={{ width: 500, height: 500, bottom: -200, right: -80 }} />

      {/* Header */}
      <header className="diseases-header">
        <span className="page-badge">📚 Medical Reference</span>
        <h1>Brain Tumor Guide</h1>
        <p>Click any condition below for a detailed, plain-English explanation of what it is, how it's diagnosed, and how it's treated.</p>
      </header>

      {/* Cards Grid */}
      <div className="diseases-grid">
        {DISEASES.map((d) => (
          <DiseaseCard key={d.id} disease={d} onClick={setSelected} />
        ))}
      </div>

      {/* Detail Modal */}
      {selected && <DiseaseDetail disease={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
