export type PlayerRole = 'S' | 'OH' | 'OPP' | 'MB' | 'L'

export type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6

export type RotationPhase = 'recepcao' | 'saque'

export type AppPage = 'inicio' | 'escalacao' | 'exibicao' | 'partida'

export interface Player {
  id: string
  name: string
  number: number
  role: PlayerRole
}

export interface TeamState {
  teamName: string
  players: Player[]
  /** Jogador em cada posição na rotação 1 (alinhamento base). */
  lineup: Record<CourtPosition, string | null>
  liberoId: string | null
  /** Rotação atual (1–6). */
  currentRotation: CourtPosition
  /** Time está sacando. */
  isServing: boolean
  /** Configuração inicial concluída. */
  setupComplete: boolean
  /** Versão do alinhamento base (ordem de saque). */
  lineupVersion?: number
}

export const ROLE_LABELS: Record<PlayerRole, string> = {
  S: 'Levantador',
  OH: 'Ponta',
  OPP: 'Oposto',
  MB: 'Central',
  L: 'Líbero',
}

export const ROLE_SHORT: Record<PlayerRole, string> = {
  S: 'L',
  OH: 'P',
  OPP: 'O',
  MB: 'C',
  L: 'LB',
}

export const COURT_POSITIONS: CourtPosition[] = [4, 3, 2, 5, 6, 1]

export const FRONT_ROW: CourtPosition[] = [2, 3, 4]
export const BACK_ROW: CourtPosition[] = [1, 5, 6]

export const PAGE_LABELS: Record<AppPage, string> = {
  inicio: 'Início',
  escalacao: 'Escalação',
  exibicao: 'Exibição',
  partida: 'Partida',
}
