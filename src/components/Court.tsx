import type { CourtPosition, PlayerRole } from '../types'
import { ROLE_SHORT } from '../types'
import {
  analyzeRotation,
  getEffectivePlayer,
  getLineupForRotation,
  isSetterSetting,
} from '../lib/rotation'
import type { TeamState } from '../types'

interface CourtProps {
  state: TeamState
}

const POSITION_LAYOUT: Record<
  CourtPosition,
  { row: 'front' | 'back'; col: 'left' | 'center' | 'right'; label: string }
> = {
  4: { row: 'front', col: 'left', label: 'P4' },
  3: { row: 'front', col: 'center', label: 'P3' },
  2: { row: 'front', col: 'right', label: 'P2' },
  5: { row: 'back', col: 'left', label: 'P5' },
  6: { row: 'back', col: 'center', label: 'P6' },
  1: { row: 'back', col: 'right', label: 'P1' },
}

function roleClass(role: PlayerRole): string {
  return `role-${role.toLowerCase()}`
}

export function Court({ state }: CourtProps) {
  const lineup = getLineupForRotation(state.lineup, state.currentRotation)
  const insight = analyzeRotation(state)

  const renderSpot = (pos: CourtPosition) => {
    const layout = POSITION_LAYOUT[pos]
    const applyLibero = !state.isServing
    const effective = getEffectivePlayer(lineup, pos, state.players, state.liberoId, applyLibero)
    const isServer = state.isServing && pos === 1
    const isSetter = effective && isSetterSetting(effective.player, pos)
    const isLibero = effective?.isLiberoSub

    return (
      <div
        key={pos}
        className={`court-spot ${layout.row} ${layout.col} ${effective ? 'occupied' : 'empty'} ${isServer ? 'serving' : ''} ${isSetter ? 'setter-spot' : ''}`}
      >
        <span className="spot-label">{layout.label}</span>
        {effective ? (
          <div className={`player-chip ${roleClass(effective.player.role)} ${isLibero ? 'libero-sub' : ''}`}>
            <span className="player-number">#{effective.player.number}</span>
            <span className="player-name">{effective.player.name}</span>
            <span className="player-role">{ROLE_SHORT[effective.player.role]}</span>
            {isLibero && effective.replacedPlayer && (
              <span className="libero-for">↔ #{effective.replacedPlayer.number}</span>
            )}
            {isServer && <span className="serve-badge">SAQUE</span>}
          </div>
        ) : (
          <span className="empty-slot">—</span>
        )}
      </div>
    )
  }

  return (
    <div className="court-wrapper">
      <div className="court">
        <div className="net-line">
          <span>REDE</span>
        </div>
        <div className="court-grid">
          {([4, 3, 2, 5, 6, 1] as CourtPosition[]).map(renderSpot)}
        </div>
      </div>

      <div className="court-legend">
        {insight.setter && (
          <div className="legend-item">
            <span className="legend-dot setter" />
            Levantador: #{insight.setter.player.number} (
            {insight.setter.settingFrom === 'front' ? 'frente' : 'fundo'})
          </div>
        )}
        {state.isServing && insight.server && (
          <div className="legend-item">
            <span className="legend-dot serve" />
            Sacador: #{insight.server.number}
          </div>
        )}
        {insight.nextServer && (
          <div className="legend-item">
            <span className="legend-dot next-serve" />
            Próximo saque: #{insight.nextServer.number}
          </div>
        )}
        <div className="legend-item">
          <span className="legend-dot libero" />
          Líbero substitui central no fundo
        </div>
      </div>
    </div>
  )
}
