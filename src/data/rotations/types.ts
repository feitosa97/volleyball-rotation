import type { CourtPosition, RotationPhase } from '../../types'

/** Posição visual opcional na meia quadra (percentual 0–100). */
export interface VisualSpot {
  x: number
  y: number
}

export interface RotationStepConfig {
  id: string
  step: number
  rotation: CourtPosition
  phase: RotationPhase
  title: string
  description: string
  /** Posições que formam a linha de 3 na recepção. */
  receiveLine?: CourtPosition[]
  /** Ajuste fino da posição visual por zona (P1–P6). */
  visualOverrides?: Partial<Record<CourtPosition, VisualSpot>>
  notes?: string[]
}
