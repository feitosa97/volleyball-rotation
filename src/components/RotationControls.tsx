import type { CourtPosition } from '../types'
import { ROTATION_HINTS } from '../lib/rotation'

interface RotationControlsProps {
  currentRotation: CourtPosition
  isServing: boolean
  onRotationChange: (rotation: CourtPosition) => void
  onPrevRotation: () => void
  onNextRotation: () => void
  onToggleServing: () => void
  onWonServe: () => void
  onLostServe: () => void
}

export function RotationControls({
  currentRotation,
  isServing,
  onRotationChange,
  onPrevRotation,
  onNextRotation,
  onToggleServing,
  onWonServe,
  onLostServe,
}: RotationControlsProps) {
  return (
    <section className="rotation-controls">
      <div className="rotation-header">
        <h2>Rotação {currentRotation}</h2>
        <p className="rotation-hint">{ROTATION_HINTS[currentRotation]}</p>
      </div>

      <div className="rotation-picker">
        {([1, 2, 3, 4, 5, 6] as CourtPosition[]).map((r) => (
          <button
            key={r}
            type="button"
            className={`rotation-btn ${currentRotation === r ? 'active' : ''}`}
            onClick={() => onRotationChange(r)}
            aria-label={`Ir para rotação ${r}`}
            aria-pressed={currentRotation === r}
          >
            R{r}
          </button>
        ))}
      </div>

      <div className="control-row">
        <button type="button" className="btn btn-secondary" onClick={onPrevRotation}>
          ← Anterior
        </button>
        <button type="button" className="btn btn-primary" onClick={onNextRotation}>
          Próximo →
        </button>
      </div>

      <div className="serve-controls">
        <label className="toggle-label">
          <input type="checkbox" checked={isServing} onChange={onToggleServing} />
          <span>Estamos sacando</span>
        </label>
        <div className="control-row">
          <button type="button" className="btn btn-accent" onClick={onWonServe}>
            Ganhamos o saque → rodar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onLostServe}>
            Perdemos o saque
          </button>
        </div>
      </div>
    </section>
  )
}
