import type { CourtPosition, Player, PlayerRole, TeamState } from '../types'
import { COURT_POSITIONS, ROLE_LABELS } from '../types'
import { isLineupComplete } from '../lib/rotation'
import { useState } from 'react'

interface EscalacaoPageProps {
  state: TeamState
  onTeamNameChange: (name: string) => void
  onPlayerChange: (id: string, updates: Partial<Player>) => void
  onLineupChange: (position: CourtPosition, playerId: string | null) => void
  onSwapPositions: (a: CourtPosition, b: CourtPosition) => void
  onLiberoChange: (liberoId: string | null) => void
  onReset: () => void
}

const ROLES: PlayerRole[] = ['S', 'OH', 'OPP', 'MB', 'L']

export function EscalacaoPage({
  state,
  onTeamNameChange,
  onPlayerChange,
  onLineupChange,
  onSwapPositions,
  onLiberoChange,
  onReset,
}: EscalacaoPageProps) {
  const [swapFrom, setSwapFrom] = useState<CourtPosition | null>(null)
  const courtPlayers = state.players.filter((p) => p.role !== 'L')
  const liberos = state.players.filter((p) => p.role === 'L')

  const handlePositionTap = (pos: CourtPosition) => {
    if (swapFrom === null) {
      setSwapFrom(pos)
      return
    }
    if (swapFrom === pos) {
      setSwapFrom(null)
      return
    }
    onSwapPositions(swapFrom, pos)
    setSwapFrom(null)
  }

  const getPlayerLabel = (pos: CourtPosition) => {
    const id = state.lineup[pos]
    if (!id) return '— vazio —'
    const p = state.players.find((x) => x.id === id)
    return p ? `#${p.number} ${p.name}` : '—'
  }

  return (
    <section className="escalacao-page">
      <div className="page-intro">
        <h2>Escalação</h2>
        <p>Troque posições tocando em duas zonas ou edite o elenco abaixo.</p>
      </div>

      <div className="setup-header">
        <label className="field-label">
          Nome do time
          <input
            type="text"
            value={state.teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
          />
        </label>
        <button type="button" className="btn btn-danger btn-sm" onClick={onReset}>
          Reiniciar planejamento
        </button>
      </div>

      <h3>Trocar posições</h3>
      <p className="setup-hint">
        {swapFrom
          ? `Selecionado P${swapFrom} — toque em outra posição para trocar`
          : 'Toque em uma posição e depois em outra para trocar os jogadores'}
      </p>
      <div className="swap-grid">
        {COURT_POSITIONS.map((pos) => (
          <button
            key={pos}
            type="button"
            className={`swap-slot ${swapFrom === pos ? 'selected' : ''}`}
            onClick={() => handlePositionTap(pos)}
          >
            <span className="swap-pos">P{pos}</span>
            <span className="swap-name">{getPlayerLabel(pos)}</span>
          </button>
        ))}
      </div>

      <h3>Elenco</h3>
      <div className="roster-grid">
        {state.players.map((player) => (
          <div key={player.id} className="roster-card">
            <input
              type="number"
              className="number-input"
              value={player.number}
              min={1}
              max={99}
              onChange={(e) =>
                onPlayerChange(player.id, { number: parseInt(e.target.value, 10) || 0 })
              }
            />
            <input
              type="text"
              className="name-input"
              value={player.name}
              onChange={(e) => onPlayerChange(player.id, { name: e.target.value })}
            />
            <select
              value={player.role}
              onChange={(e) => onPlayerChange(player.id, { role: e.target.value as PlayerRole })}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <h3>Posições — Rotação 1</h3>
      <div className="lineup-grid">
        {COURT_POSITIONS.map((pos) => (
          <label key={pos} className="lineup-field">
            <span>P{pos}</span>
            <select
              value={state.lineup[pos] ?? ''}
              onChange={(e) => onLineupChange(pos, e.target.value || null)}
            >
              <option value="">— vazio —</option>
              {courtPlayers.map((p) => (
                <option key={p.id} value={p.id}>
                  #{p.number} {p.name} ({p.role})
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {!isLineupComplete(state.lineup) && (
        <p className="warning">Escalação incompleta — preencha as 6 posições.</p>
      )}

      <h3>Líbero</h3>
      <label className="field-label">
        Selecionar líbero
        <select
          value={state.liberoId ?? ''}
          onChange={(e) => onLiberoChange(e.target.value || null)}
        >
          <option value="">Sem líbero</option>
          {liberos.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.number} {p.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}
