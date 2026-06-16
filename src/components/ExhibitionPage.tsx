import { useEffect, useMemo, useState } from 'react'
import { buildRotationSteps, getStepByIndex } from '../data/rotations'
import type { TeamState } from '../types'
import { HalfCourt } from './HalfCourt'

interface ExhibitionPageProps {
  state: TeamState
  initialStepIndex: number
}

export function ExhibitionPage({ state, initialStepIndex }: ExhibitionPageProps) {
  const steps = useMemo(
    () => buildRotationSteps(state.opostoInverteComPonteiro),
    [state.opostoInverteComPonteiro],
  )
  const [stepIndex, setStepIndex] = useState(initialStepIndex)
  const config = getStepByIndex(stepIndex, steps)

  useEffect(() => {
    setStepIndex(initialStepIndex)
  }, [initialStepIndex])

  useEffect(() => {
    const max = steps.length - 1
    if (stepIndex > max) setStepIndex(max)
  }, [steps.length, stepIndex])

  const goPrev = () => setStepIndex((i) => (i === 0 ? steps.length - 1 : i - 1))
  const goNext = () => setStepIndex((i) => (i === steps.length - 1 ? 0 : i + 1))

  return (
    <section className="exhibition-page">
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
        {steps.map((s, i) => (
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
