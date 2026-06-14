import type { CourtPosition, PlayerRole } from '../types'
import { ROLE_SHORT } from '../types'
import type { RotationStepConfig } from '../data/rotations'
import {
  DEFAULT_VISUAL_SPOTS,
  getEffectivePlayer,
  getLineupForRotation,
  isSetterSetting,
} from '../lib/rotation'
import type { TeamState } from '../types'

interface HalfCourtProps {
  state: TeamState
  config: RotationStepConfig
  showNextServer?: boolean
}

function roleClass(role: PlayerRole): string {
  return `role-${role.toLowerCase()}`
}

export function HalfCourt({ state, config, showNextServer = true }: HalfCourtProps) {
  const lineup = getLineupForRotation(state.lineup, config.rotation)
  const isServePhase = config.phase === 'saque'

  const nextRotation = config.rotation === 6 ? 1 : ((config.rotation + 1) as CourtPosition)
  const nextLineup = getLineupForRotation(state.lineup, nextRotation)
  const nextServer = getEffectivePlayer(nextLineup, 1, state.players, state.liberoId)

  const spots = ([4, 3, 2, 5, 6, 1] as CourtPosition[]).map((pos) => {
    const effective = getEffectivePlayer(lineup, pos, state.players, state.liberoId)
    const visual = config.visualOverrides?.[pos] ?? DEFAULT_VISUAL_SPOTS[pos]
    const isServer = isServePhase && pos === 1
    const isSetter = effective && isSetterSetting(effective.player, pos)

    return (
      <div
        key={pos}
        className={`half-spot ${effective ? 'occupied' : 'empty'} ${isServer ? 'serving' : ''} ${isSetter ? 'setter-spot' : ''}`}
        style={{ left: `${visual.x}%`, top: `${visual.y}%` }}
      >
        <span className="spot-label">P{pos}</span>
        {effective ? (
          <div className={`player-chip ${roleClass(effective.player.role)} ${effective.isLiberoSub ? 'libero-sub' : ''}`}>
            <span className="player-number">#{effective.player.number}</span>
            <span className="player-name">{effective.player.name}</span>
            <span className="player-role">{ROLE_SHORT[effective.player.role]}</span>
            {isServer && <span className="serve-badge">SAQUE</span>}
            {isSetter && <span className="set-badge">LEV</span>}
          </div>
        ) : (
          <span className="empty-slot">—</span>
        )}
      </div>
    )
  })

  return (
    <div className="half-court-wrapper">
      <div className="half-court">
        <div className="net-band">
          <div className="net-post left" />
          <div className="net-mesh">
            <span>REDE</span>
          </div>
          <div className="net-post right" />
        </div>
        <div className="attack-line">
          <span>Linha de 3m</span>
        </div>
        <div className="half-court-surface">{spots}</div>
      </div>

      {isServePhase && (
        <div className="server-info">
          <div className="server-current">
            <span className="server-label">Sacador</span>
            {(() => {
              const s = getEffectivePlayer(lineup, 1, state.players, state.liberoId)
              return s ? (
                <strong>#{s.player.number} {s.player.name}</strong>
              ) : (
                <span>—</span>
              )
            })()}
          </div>
        </div>
      )}

      {config.phase === 'recepcao' && showNextServer && nextServer && (
        <div className="server-info">
          <div className="server-next">
            <span className="server-label">Próximo saque</span>
            <strong>#{nextServer.player.number} {nextServer.player.name}</strong>
            <span className="server-hint">(se ganharmos o ponto → R{nextRotation})</span>
          </div>
        </div>
      )}
    </div>
  )
}
