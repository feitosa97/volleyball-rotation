import type { CourtPosition, Player, PlayerRole, TeamState } from '../types'
import { COURT_POSITIONS, ROLE_LABELS } from '../types'
import { isLineupSetupReady, LineupSetupQuestions } from './LineupSetupQuestions'
import { useState } from 'react'

interface EscalacaoPageProps {
  state: TeamState
  onTeamNameChange: (name: string) => void
  onPlayerChange: (id: string, updates: Partial<Player>) => void
  onFrontPontaChange: (playerId: string) => void
  onFrontCentralChange: (playerId: string) => void
  onOpostoInverteChange: (value: boolean) => void
  onSwapPositions: (a: CourtPosition, b: CourtPosition) => void
  onLiberoChange: (liberoId: string | null) => void
  onReset: () => void
}

const ROLES: PlayerRole[] = ['S', 'OH', 'OPP', 'MB', 'L']

export function EscalacaoPage({
  state,
  onTeamNameChange,
  onPlayerChange,
  onFrontPontaChange,
  onFrontCentralChange,
  onOpostoInverteChange,
  onSwapPositions,
  onLiberoChange,
  onReset,
}: EscalacaoPageProps) {
  const [swapFrom, setSwapFrom] = useState<CourtPosition | null>(null)
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
        <p>Defina quem começa na frente ou troque posições manualmente.</p>
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

      <h3>Escalação inicial — Rotação 1</h3>
      <LineupSetupQuestions
        state={state}
        onFrontPontaChange={onFrontPontaChange}
        onFrontCentralChange={onFrontCentralChange}
      />

      {!isLineupSetupReady(state) && (
        <p className="warning">Selecione a ponta e o central que começam na frente.</p>
      )}

      <div className="toggle-card">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={state.opostoInverteComPonteiro}
            onChange={(e) => onOpostoInverteChange(e.target.checked)}
          />
          <span>Oposto inverte com ponteiro?</span>
        </label>
      </div>

      <h3>Trocar posições manualmente</h3>
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
