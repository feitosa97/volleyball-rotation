import { useCallback, useEffect, useState } from 'react'
import type { AppPage, CourtPosition, Player, TeamState } from './types'
import { AppShell } from './components/AppShell'
import { getStepIndexFor } from './data/rotations'
import {
  buildServeOrderLineup,
  createInitialState,
  loadState,
  saveState,
  swapLineupPositions,
} from './lib/rotation'

function initialExhibitionStep(): number {
  const saved = loadState()
  if (!saved.setupComplete) return 0
  return getStepIndexFor(saved.currentRotation, saved.isServing ? 'saque' : 'recepcao')
}

function App() {
  const [state, setState] = useState<TeamState>(() => loadState())
  const [page, setPage] = useState<AppPage>(() =>
    loadState().setupComplete ? 'exibicao' : 'inicio',
  )
  const [exhibitionStepIndex, setExhibitionStepIndex] = useState(initialExhibitionStep)

  useEffect(() => {
    saveState(state)
  }, [state])

  const update = useCallback((patch: Partial<TeamState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const rebuildLineup = (players: Player[], frontPontaId: string | null, frontCentralId: string | null) =>
    buildServeOrderLineup(players, frontPontaId, frontCentralId)

  const handlePlayerChange = (id: string, updates: Partial<Player>) => {
    setState((prev) => {
      const players = prev.players.map((p) => (p.id === id ? { ...p, ...updates } : p))
      let { frontPontaId, frontCentralId } = prev
      const pontas = players.filter((p) => p.role === 'OH')
      const centrals = players.filter((p) => p.role === 'MB')

      if (frontPontaId && !pontas.some((p) => p.id === frontPontaId)) {
        frontPontaId = pontas[0]?.id ?? null
      }
      if (frontCentralId && !centrals.some((p) => p.id === frontCentralId)) {
        frontCentralId = centrals[0]?.id ?? null
      }

      return {
        ...prev,
        players,
        frontPontaId,
        frontCentralId,
        lineup: rebuildLineup(players, frontPontaId, frontCentralId),
      }
    })
  }

  const handleFrontPontaChange = (frontPontaId: string) => {
    setState((prev) => ({
      ...prev,
      frontPontaId,
      lineup: rebuildLineup(prev.players, frontPontaId, prev.frontCentralId),
    }))
  }

  const handleFrontCentralChange = (frontCentralId: string) => {
    setState((prev) => ({
      ...prev,
      frontCentralId,
      lineup: rebuildLineup(prev.players, prev.frontPontaId, frontCentralId),
    }))
  }

  const handleSwapPositions = (a: CourtPosition, b: CourtPosition) => {
    setState((prev) => ({
      ...prev,
      lineup: swapLineupPositions(prev.lineup, a, b),
    }))
  }

  const handleReset = () => {
    if (confirm('Reiniciar todo o planejamento do time? Todos os dados serão apagados.')) {
      setState(createInitialState())
      setExhibitionStepIndex(0)
      setPage('inicio')
    }
  }

  const handleCompleteSetup = (rotation: CourtPosition, wonBall: boolean) => {
    const phase = wonBall ? 'saque' : 'recepcao'
    const stepIndex = getStepIndexFor(rotation, phase)
    setExhibitionStepIndex(stepIndex)
    update({
      currentRotation: rotation,
      isServing: wonBall,
      setupComplete: true,
    })
    setPage('exibicao')
  }

  return (
    <AppShell
      page={page}
      state={state}
      exhibitionStepIndex={exhibitionStepIndex}
      onNavigate={setPage}
      onUpdate={update}
      onPlayerChange={handlePlayerChange}
      onFrontPontaChange={handleFrontPontaChange}
      onFrontCentralChange={handleFrontCentralChange}
      onSwapPositions={handleSwapPositions}
      onReset={handleReset}
      onCompleteSetup={handleCompleteSetup}
    />
  )
}

export default App
