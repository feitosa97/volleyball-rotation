import type { CourtPosition, Player, PlayerRole, TeamState } from '../types'
import { BACK_ROW, FRONT_ROW } from '../types'

/** Rotação horária: cada posição avança para a próxima. */
const NEXT_POSITION: Record<CourtPosition, CourtPosition> = {
  1: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
}

export function rotateClockwise(
  lineup: Record<CourtPosition, string | null>,
): Record<CourtPosition, string | null> {
  const next = { ...lineup } as Record<CourtPosition, string | null>
  for (const pos of [1, 2, 3, 4, 5, 6] as CourtPosition[]) {
    next[NEXT_POSITION[pos]] = lineup[pos]
  }
  return next
}

export function getLineupForRotation(
  baseLineup: Record<CourtPosition, string | null>,
  rotation: CourtPosition,
): Record<CourtPosition, string | null> {
  let lineup = { ...baseLineup }
  const steps = rotation - 1
  for (let i = 0; i < steps; i++) {
    lineup = rotateClockwise(lineup)
  }
  return lineup
}

export function getPlayerAtPosition(
  lineup: Record<CourtPosition, string | null>,
  position: CourtPosition,
  players: Player[],
): Player | null {
  const id = lineup[position]
  if (!id) return null
  return players.find((p) => p.id === id) ?? null
}

export function isFrontRow(position: CourtPosition): boolean {
  return FRONT_ROW.includes(position)
}

export function isBackRow(position: CourtPosition): boolean {
  return BACK_ROW.includes(position)
}

export function isSetterSetting(player: Player, position: CourtPosition): boolean {
  if (player.role !== 'S') return false
  return isFrontRow(position) || position === 1
}

/** Prioridade de substituição quando há mais de um central no fundo (só um líbero em quadra). */
const LIBERO_REPLACE_PRIORITY: CourtPosition[] = [6, 5, 1]

export function getLiberoReplacementPosition(
  lineup: Record<CourtPosition, string | null>,
  players: Player[],
  liberoId: string | null,
): CourtPosition | null {
  if (!liberoId) return null
  for (const pos of LIBERO_REPLACE_PRIORITY) {
    const player = getPlayerAtPosition(lineup, pos, players)
    if (player?.role === 'MB') return pos
  }
  return null
}

export function shouldLiberoEnter(
  player: Player,
  position: CourtPosition,
  liberoId: string | null,
  liberoReplacementPos: CourtPosition | null,
): boolean {
  if (!liberoId || player.role !== 'MB') return false
  return isBackRow(position) && position === liberoReplacementPos
}

export function getEffectivePlayer(
  lineup: Record<CourtPosition, string | null>,
  position: CourtPosition,
  players: Player[],
  liberoId: string | null,
): { player: Player; isLiberoSub: boolean; replacedPlayer: Player | null } | null {
  const player = getPlayerAtPosition(lineup, position, players)
  if (!player) return null

  const liberoReplacementPos = getLiberoReplacementPosition(lineup, players, liberoId)

  if (shouldLiberoEnter(player, position, liberoId, liberoReplacementPos)) {
    const libero = players.find((p) => p.id === liberoId)
    if (libero) {
      return { player: libero, isLiberoSub: true, replacedPlayer: player }
    }
  }

  return { player, isLiberoSub: false, replacedPlayer: null }
}

export interface RotationInsight {
  setter: { player: Player; position: CourtPosition; settingFrom: 'front' | 'back' | 'none' } | null
  server: Player | null
  nextServer: Player | null
  frontRow: Array<{ player: Player; position: CourtPosition }>
  backRow: Array<{ player: Player; position: CourtPosition; liberoSub: boolean }>
}

export function analyzeRotation(state: TeamState): RotationInsight {
  const lineup = getLineupForRotation(state.lineup, state.currentRotation)
  const frontRow: RotationInsight['frontRow'] = []
  const backRow: RotationInsight['backRow'] = []
  let setter: RotationInsight['setter'] = null
  let server: Player | null = null

  for (const pos of FRONT_ROW) {
    const effective = getEffectivePlayer(lineup, pos, state.players, state.liberoId)
    if (effective) {
      frontRow.push({ player: effective.player, position: pos })
      if (effective.player.role === 'S') {
        setter = { player: effective.player, position: pos, settingFrom: 'front' }
      }
    }
  }

  for (const pos of BACK_ROW) {
    const effective = getEffectivePlayer(lineup, pos, state.players, state.liberoId)
    if (effective) {
      backRow.push({
        player: effective.player,
        position: pos,
        liberoSub: effective.isLiberoSub,
      })
      if (effective.player.role === 'S' && !setter) {
        setter = { player: effective.player, position: pos, settingFrom: pos === 1 ? 'back' : 'none' }
      }
      if (pos === 1) {
        server = effective.player
      }
    }
  }

  const nextRotation = state.currentRotation === 6 ? 1 : ((state.currentRotation + 1) as CourtPosition)
  const nextLineup = getLineupForRotation(state.lineup, nextRotation)
  const nextServerEff = getEffectivePlayer(nextLineup, 1, state.players, state.liberoId)

  return {
    setter,
    server,
    nextServer: nextServerEff?.player ?? null,
    frontRow,
    backRow,
  }
}

export const ROTATION_HINTS: Record<CourtPosition, string> = {
  1: 'Levantador no fundo direito (P1). Levanta da zona 1.',
  2: 'Levantador na frente direita (P2). Levantamento clássico de frente.',
  3: 'Levantador no meio da frente (P3). Ataque central.',
  4: 'Levantador na frente esquerda (P4). Slide e pipe.',
  5: 'Levantador no fundo esquerdo (P5). Penetração da esquerda.',
  6: 'Levantador no fundo central (P6). Prepara transição para P1.',
}

export function createDefaultPlayers(): Player[] {
  const defaults: Array<{ name: string; number: number; role: PlayerRole }> = [
    { name: 'Levantador', number: 1, role: 'S' },
    { name: 'Ponta 1', number: 7, role: 'OH' },
    { name: 'Ponta 2', number: 9, role: 'OH' },
    { name: 'Oposto', number: 11, role: 'OPP' },
    { name: 'Central 1', number: 5, role: 'MB' },
    { name: 'Central 2', number: 15, role: 'MB' },
    { name: 'Líbero', number: 3, role: 'L' },
  ]
  return defaults.map((d) => ({
    id: crypto.randomUUID(),
    ...d,
  }))
}

export const STORAGE_KEY = 'volley-5x1-state'
export const CURRENT_LINEUP_VERSION = 2

/** Alinhamento R1 para ordem de saque: passos 2,4,6,8,10,12 = Lev, P1, C1, OPP, P2, C2 */
export function buildServeOrderLineup(players: Player[]): Record<CourtPosition, string | null> {
  const byRole = (role: PlayerRole) => players.find((p) => p.role === role)
  const oh1 = players.filter((p) => p.role === 'OH')[0]
  const oh2 = players.filter((p) => p.role === 'OH')[1]
  const mb1 = players.filter((p) => p.role === 'MB')[0]
  const mb2 = players.filter((p) => p.role === 'MB')[1]
  return {
    1: byRole('S')?.id ?? null,
    2: oh1?.id ?? null,
    3: mb1?.id ?? null,
    4: byRole('OPP')?.id ?? null,
    5: oh2?.id ?? null,
    6: mb2?.id ?? null,
  }
}

export function createDefaultLineup(players: Player[]): Record<CourtPosition, string | null> {
  return buildServeOrderLineup(players)
}

export function createInitialState(): TeamState {
  const players = createDefaultPlayers()
  const libero = players.find((p) => p.role === 'L')
  return {
    teamName: 'Meu Time',
    players,
    lineup: createDefaultLineup(players),
    liberoId: libero?.id ?? null,
    currentRotation: 1,
    isServing: false,
    setupComplete: false,
    lineupVersion: CURRENT_LINEUP_VERSION,
  }
}

export function isLineupComplete(lineup: Record<CourtPosition, string | null>): boolean {
  return ([1, 2, 3, 4, 5, 6] as CourtPosition[]).every((pos) => lineup[pos] !== null)
}

export function swapLineupPositions(
  lineup: Record<CourtPosition, string | null>,
  a: CourtPosition,
  b: CourtPosition,
): Record<CourtPosition, string | null> {
  return { ...lineup, [a]: lineup[b], [b]: lineup[a] }
}

export function loadState(): TeamState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as TeamState
      const players = parsed.players?.length ? parsed.players : createDefaultPlayers()
      const needsLineupMigration =
        !parsed.lineupVersion || parsed.lineupVersion < CURRENT_LINEUP_VERSION

      return {
        ...createInitialState(),
        ...parsed,
        players,
        lineup: needsLineupMigration ? buildServeOrderLineup(players) : parsed.lineup,
        lineupVersion: CURRENT_LINEUP_VERSION,
        setupComplete: parsed.setupComplete ?? false,
      }
    }
  } catch {
    /* defaults */
  }
  return createInitialState()
}

export function saveState(state: TeamState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

/** Posição visual padrão na meia quadra (percentual). */
export const DEFAULT_VISUAL_SPOTS: Record<CourtPosition, { x: number; y: number }> = {
  4: { x: 15, y: 35 },
  3: { x: 50, y: 30 },
  2: { x: 85, y: 35 },
  5: { x: 15, y: 72 },
  6: { x: 50, y: 76 },
  1: { x: 85, y: 72 },
}
