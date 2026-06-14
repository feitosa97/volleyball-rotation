import type { AppPage } from '../types'
import { HamburgerMenu } from './HamburgerMenu'
import { HomePage } from './HomePage'
import { EscalacaoPage } from './EscalacaoPage'
import { ExhibitionPage } from './ExhibitionPage'
import { MatchPage } from './MatchPage'
import type { TeamState } from '../types'
import type { CourtPosition, Player } from '../types'

interface AppShellProps {
  page: AppPage
  state: TeamState
  onNavigate: (page: AppPage) => void
  onUpdate: (patch: Partial<TeamState>) => void
  onPlayerChange: (id: string, updates: Partial<Player>) => void
  onLineupChange: (position: CourtPosition, playerId: string | null) => void
  onSwapPositions: (a: CourtPosition, b: CourtPosition) => void
  onReset: () => void
  onCompleteSetup: (rotation: CourtPosition, wonBall: boolean) => void
}

export function AppShell({
  page,
  state,
  onNavigate,
  onUpdate,
  onPlayerChange,
  onLineupChange,
  onSwapPositions,
  onReset,
  onCompleteSetup,
}: AppShellProps) {
  const effectivePage = !state.setupComplete ? 'inicio' : page

  return (
    <div className="app">
      <header className="app-header">
        <HamburgerMenu currentPage={effectivePage} onNavigate={onNavigate} setupComplete={state.setupComplete} />
        <div className="header-brand">
          <span className="logo" aria-hidden>🏐</span>
          <div>
            <h1>Vôlei 5×1</h1>
            <p className="subtitle">{state.teamName}</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {effectivePage === 'inicio' && (
          <HomePage
            state={state}
            onTeamNameChange={(teamName) => onUpdate({ teamName })}
            onPlayerChange={onPlayerChange}
            onLineupChange={onLineupChange}
            onLiberoChange={(liberoId) => onUpdate({ liberoId })}
            onCompleteSetup={onCompleteSetup}
          />
        )}
        {effectivePage === 'escalacao' && (
          <EscalacaoPage
            state={state}
            onTeamNameChange={(teamName) => onUpdate({ teamName })}
            onPlayerChange={onPlayerChange}
            onLineupChange={onLineupChange}
            onSwapPositions={onSwapPositions}
            onLiberoChange={(liberoId) => onUpdate({ liberoId })}
            onReset={onReset}
          />
        )}
        {effectivePage === 'exibicao' && (
          <ExhibitionPage state={state} />
        )}
        {effectivePage === 'partida' && (
          <MatchPage
            state={state}
            onUpdate={onUpdate}
          />
        )}
      </main>

      <footer className="app-footer">
        Sistema 5×1 · um levantador · seis rotações
      </footer>
    </div>
  )
}
