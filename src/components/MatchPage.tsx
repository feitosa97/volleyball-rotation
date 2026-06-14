import type { TeamState } from '../types'
import type { CourtPosition } from '../types'
import { Court } from './Court'
import { RotationControls } from './RotationControls'

interface MatchPageProps {
  state: TeamState
  onUpdate: (patch: Partial<TeamState>) => void
}

export function MatchPage({ state, onUpdate }: MatchPageProps) {
  const handleRotationChange = (rotation: CourtPosition) => {
    onUpdate({ currentRotation: rotation })
  }

  const handlePrevRotation = () => {
    const prev = state.currentRotation === 1 ? 6 : ((state.currentRotation - 1) as CourtPosition)
    onUpdate({ currentRotation: prev })
  }

  const handleNextRotation = () => {
    const next = state.currentRotation === 6 ? 1 : ((state.currentRotation + 1) as CourtPosition)
    onUpdate({ currentRotation: next })
  }

  const handleWonServe = () => {
    const nextRotation = state.currentRotation === 6 ? 1 : ((state.currentRotation + 1) as CourtPosition)
    onUpdate({ currentRotation: nextRotation, isServing: true })
  }

  const handleLostServe = () => {
    onUpdate({ isServing: false })
  }

  return (
    <section className="match-page">
      <div className="page-intro">
        <h2>Partida</h2>
        <p>Acompanhe a rotação atual durante o jogo.</p>
      </div>
      <Court state={state} />
      <RotationControls
        currentRotation={state.currentRotation}
        isServing={state.isServing}
        onRotationChange={handleRotationChange}
        onPrevRotation={handlePrevRotation}
        onNextRotation={handleNextRotation}
        onToggleServing={() => onUpdate({ isServing: !state.isServing })}
        onWonServe={handleWonServe}
        onLostServe={handleLostServe}
      />
    </section>
  )
}
