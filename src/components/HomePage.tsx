import type { CourtPosition, Player, PlayerRole, TeamState } from '../types'
import { ROLE_LABELS } from '../types'
import { isLineupSetupReady, LineupSetupQuestions } from './LineupSetupQuestions'
import { useState } from 'react'

interface HomePageProps {
  state: TeamState
  onTeamNameChange: (name: string) => void
  onPlayerChange: (id: string, updates: Partial<Player>) => void
  onFrontPontaChange: (playerId: string) => void
  onFrontCentralChange: (playerId: string) => void
  onOpostoInverteChange: (value: boolean) => void
  onLiberoChange: (liberoId: string | null) => void
  onCompleteSetup: (rotation: CourtPosition, wonBall: boolean) => void
}

const ROLES: PlayerRole[] = ['S', 'OH', 'OPP', 'MB', 'L']

export function HomePage({
  state,
  onTeamNameChange,
  onPlayerChange,
  onFrontPontaChange,
  onFrontCentralChange,
  onOpostoInverteChange,
  onLiberoChange,
  onCompleteSetup,
}: HomePageProps) {
  const [startingRotation, setStartingRotation] = useState<CourtPosition>(1)
  const [wonBall, setWonBall] = useState<boolean | null>(null)

  const liberos = state.players.filter((p) => p.role === 'L')
  const lineupOk = isLineupSetupReady(state)
  const canFinish = lineupOk && wonBall !== null && state.teamName.trim().length > 0

  return (
    <section className="home-page">
      <div className="page-intro">
        <h2>Configuração do time</h2>
        <p>Cadastre todos os jogadores, incluindo o líbero, e defina a escalação inicial.</p>
      </div>

      <label className="field-label">
        Nome do time
        <input
          type="text"
          value={state.teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          placeholder="Ex.: Minha equipe"
        />
      </label>

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
              aria-label={`Número de ${player.name}`}
            />
            <input
              type="text"
              className="name-input"
              value={player.name}
              onChange={(e) => onPlayerChange(player.id, { name: e.target.value })}
              aria-label="Nome do jogador"
            />
            <select
              value={player.role}
              onChange={(e) => onPlayerChange(player.id, { role: e.target.value as PlayerRole })}
              aria-label={`Função de ${player.name}`}
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

      <h3>Escalação inicial — Rotação 1</h3>
      <LineupSetupQuestions
        state={state}
        onFrontPontaChange={onFrontPontaChange}
        onFrontCentralChange={onFrontCentralChange}
      />

      {!lineupOk && (
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
        <p className="setup-hint">
          Ativa a formação alternativa da Rotação 2 — Recepção (passo 3).
        </p>
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

      <h3>Situação da bola</h3>
      <p className="setup-hint">
        A posição inicial depende se o time ganhou ou perdeu a última bola.
      </p>

      <div className="ball-choice">
        <button
          type="button"
          className={`choice-btn ${wonBall === true ? 'selected' : ''}`}
          onClick={() => setWonBall(true)}
        >
          <span className="choice-icon">✓</span>
          <span className="choice-label">Ganhamos a bola</span>
          <span className="choice-desc">Estamos sacando</span>
        </button>
        <button
          type="button"
          className={`choice-btn ${wonBall === false ? 'selected' : ''}`}
          onClick={() => setWonBall(false)}
        >
          <span className="choice-icon">✗</span>
          <span className="choice-label">Perdemos a bola</span>
          <span className="choice-desc">Estamos recebendo</span>
        </button>
      </div>

      <label className="field-label">
        Rotação atual
        <select
          value={startingRotation}
          onChange={(e) => setStartingRotation(parseInt(e.target.value, 10) as CourtPosition)}
        >
          {([1, 2, 3, 4, 5, 6] as CourtPosition[]).map((r) => (
            <option key={r} value={r}>
              Rotação {r} — {wonBall === true ? 'saque' : wonBall === false ? 'recepção' : '…'}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="btn btn-primary btn-block"
        disabled={!canFinish}
        onClick={() => wonBall !== null && onCompleteSetup(startingRotation, wonBall)}
      >
        Salvar e continuar
      </button>
    </section>
  )
}
