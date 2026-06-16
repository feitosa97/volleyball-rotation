import type { Player, TeamState } from '../types'

interface LineupSetupQuestionsProps {
  state: TeamState
  onFrontPontaChange: (playerId: string) => void
  onFrontCentralChange: (playerId: string) => void
}

const SERVE_ORDER = [
  { pos: 1, label: 'Levantador' },
  { pos: 2, label: 'Ponta 1 (frente)' },
  { pos: 3, label: 'Central 1 (frente)' },
  { pos: 4, label: 'Oposto' },
  { pos: 5, label: 'Ponta 2' },
  { pos: 6, label: 'Central 2' },
] as const

function playerLabel(players: Player[], id: string | null): string {
  if (!id) return '—'
  const p = players.find((x) => x.id === id)
  return p ? `#${p.number} ${p.name}` : '—'
}

export function LineupSetupQuestions({
  state,
  onFrontPontaChange,
  onFrontCentralChange,
}: LineupSetupQuestionsProps) {
  const pontas = state.players.filter((p) => p.role === 'OH')
  const centrals = state.players.filter((p) => p.role === 'MB')

  return (
    <div className="lineup-setup">
      <p className="setup-hint">
        Ordem de saque fixa na Rotação 1: P1 Levantador → P2 Ponta 1 → P3 Central 1 → P4 Oposto → P5 Ponta 2 → P6 Central 2.
      </p>

      <label className="field-label">
        Qual ponta começa na frente? (P2 — Ponta 1)
        <select
          value={state.frontPontaId ?? ''}
          onChange={(e) => onFrontPontaChange(e.target.value)}
        >
          <option value="">— selecione —</option>
          {pontas.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.number} {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field-label">
        Qual central começa na frente? (P3 — Central 1)
        <select
          value={state.frontCentralId ?? ''}
          onChange={(e) => onFrontCentralChange(e.target.value)}
        >
          <option value="">— selecione —</option>
          {centrals.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.number} {p.name}
            </option>
          ))}
        </select>
      </label>

      <div className="lineup-summary">
        <p className="lineup-summary-title">Escalação resultante — R1</p>
        <ul className="lineup-summary-list">
          {SERVE_ORDER.map(({ pos, label }) => (
            <li key={pos}>
              <span className="lineup-summary-pos">P{pos}</span>
              <span className="lineup-summary-role">{label}</span>
              <span className="lineup-summary-player">
                {playerLabel(state.players, state.lineup[pos])}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function isLineupSetupReady(state: TeamState): boolean {
  return (
    state.frontPontaId !== null &&
    state.frontCentralId !== null &&
    pontasCount(state) >= 2 &&
    centralsCount(state) >= 2
  )
}

function pontasCount(state: TeamState) {
  return state.players.filter((p) => p.role === 'OH').length
}

function centralsCount(state: TeamState) {
  return state.players.filter((p) => p.role === 'MB').length
}
