import { useState } from 'react'
import { ROTATION_STEPS, getStepByIndex } from '../data/rotations'
import type { TeamState } from '../types'
import { HalfCourt } from './HalfCourt'

interface ExhibitionPageProps {
  state: TeamState
}

export function ExhibitionPage({ state }: ExhibitionPageProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const config = getStepByIndex(stepIndex)

  const goPrev = () => setStepIndex((i) => (i === 0 ? 11 : i - 1))
  const goNext = () => setStepIndex((i) => (i === 11 ? 0 : i + 1))

  return (
    <section className="exhibition-page">
      <div className="page-intro">
        <h2>Exibição — 12 passos</h2>
        <p>Recepção e saque em cada rotação do sistema 5×1.</p>
      </div>

      <div className="step-header">
        <span className="step-badge">Passo {config.step}/12</span>
        <h3>{config.title}</h3>
        <p className="step-desc">{config.description}</p>
      </div>

      <HalfCourt state={state} config={config} />

      {config.notes && config.notes.length > 0 && (
        <ul className="step-notes">
          {config.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}

      <div className="step-picker">
        {ROTATION_STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`step-dot ${i === stepIndex ? 'active' : ''} ${s.phase}`}
            onClick={() => setStepIndex(i)}
            aria-label={`Passo ${s.step}: ${s.title}`}
            title={s.title}
          >
            {s.step}
          </button>
        ))}
      </div>

      <div className="control-row">
        <button type="button" className="btn btn-secondary" onClick={goPrev}>
          ← Anterior
        </button>
        <button type="button" className="btn btn-primary" onClick={goNext}>
          Próximo →
        </button>
      </div>
    </section>
  )
}
