import type { CourtPosition, PlayerRole } from '../types'
import { ROLE_SHORT } from '../types'
import type { RotationStepConfig } from '../data/rotations'
import { buildRotationSteps, getStepForRotation } from '../data/rotations'
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
  const applyLibero = config.liberoInCourt
  const receiveLine = new Set(config.receiveLine ?? [])
  const steps = buildRotationSteps(state.opostoInverteComPonteiro)

  const nextRotation = config.rotation === 6 ? 1 : ((config.rotation + 1) as CourtPosition)
  const nextLineup = getLineupForRotation(state.lineup, nextRotation)
  const nextSaqueStep = getStepForRotation(nextRotation, 'saque', steps)
  const nextServer = getEffectivePlayer(
    nextLineup,
    1,
    state.players,
    state.liberoId,
    nextSaqueStep.liberoInCourt,
  )

  const spots = ([4, 3, 2, 5, 6, 1] as CourtPosition[]).map((pos) => {
    const effective = getEffectivePlayer(lineup, pos, state.players, state.liberoId, applyLibero)
    const visual = config.visualOverrides?.[pos] ?? DEFAULT_VISUAL_SPOTS[pos]
    const isServer = isServePhase && pos === 1
    const isSetter = effective && isSetterSetting(effective.player, pos)
    const inReceiveLine = config.phase === 'recepcao' && receiveLine.has(pos)

    return (
      <div
        key={pos}
        className={`half-spot ${effective ? 'occupied' : 'empty'} ${isServer ? 'serving' : ''} ${isSetter ? 'setter-spot' : ''} ${inReceiveLine ? 'receive-line' : ''}`}
        style={{ left: `${visual.x}%`, top: `${visual.y}%` }}
      >
        <span className="spot-label">P{pos}</span>
        {effective ? (
          <div className={`player-chip ${roleClass(effective.player.role)} ${effective.isLiberoSub ? 'libero-sub' : ''}`}>
            <span className="player-number">#{effective.player.number}</span>
            <span className="player-name">{effective.player.name}</span>
            <span className="player-role">{ROLE_SHORT[effective.player.role]}</span>
            {isServer && <span className="serve-badge">SAQUE</span>}
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
    </div>
  )
}
