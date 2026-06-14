import { useCallback, useEffect, useState } from 'react'
import type { AppPage, CourtPosition, Player, TeamState } from './types'
import { AppShell } from './components/AppShell'
import {
  createInitialState,
  loadState,
  saveState,
  swapLineupPositions,
} from './lib/rotation'

function App() {
  const [state, setState] = useState<TeamState>(() => loadState())
  const [page, setPage] = useState<AppPage>(() =>
    loadState().setupComplete ? 'exibicao' : 'inicio',
  )

  useEffect(() => {
    saveState(state)
  }, [state])

  const update = useCallback((patch: Partial<TeamState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const handlePlayerChange = (id: string, updates: Partial<Player>) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }

  const handleLineupChange = (position: CourtPosition, playerId: string | null) => {
    setState((prev) => ({
      ...prev,
      lineup: { ...prev.lineup, [position]: playerId },
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
      setPage('inicio')
    }
  }

  const handleCompleteSetup = (rotation: CourtPosition, wonBall: boolean) => {
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
      onNavigate={setPage}
      onUpdate={update}
      onPlayerChange={handlePlayerChange}
      onLineupChange={handleLineupChange}
      onSwapPositions={handleSwapPositions}
      onReset={handleReset}
      onCompleteSetup={handleCompleteSetup}
    />
  )
}

export default App
