import type { CourtPosition, RotationPhase } from '../../types'
import type { RotationStepConfig } from './types'
import { rotacao01Recepcao } from './rotacao-01-recepcao'
import { rotacao01Saque } from './rotacao-01-saque'
import { rotacao02Recepcao } from './rotacao-02-recepcao'
import { rotacao02RecepcaoAlt } from './rotacao-02-recepcao-alt'
import { rotacao02Saque } from './rotacao-02-saque'
import { rotacao03Recepcao } from './rotacao-03-recepcao'
import { rotacao03Saque } from './rotacao-03-saque'
import { rotacao04Recepcao } from './rotacao-04-recepcao'
import { rotacao04Saque } from './rotacao-04-saque'
import { rotacao05Recepcao } from './rotacao-05-recepcao'
import { rotacao05Saque } from './rotacao-05-saque'
import { rotacao06Recepcao } from './rotacao-06-recepcao'
import { rotacao06Saque } from './rotacao-06-saque'

/** Monta os 12 passos; passo 3 usa alternativa se oposto inverte com ponteiro. */
export function buildRotationSteps(opostoInverteComPonteiro = true): RotationStepConfig[] {
  return [
    rotacao01Recepcao,
    rotacao01Saque,
    opostoInverteComPonteiro ? rotacao02RecepcaoAlt : rotacao02Recepcao,
    rotacao02Saque,
    rotacao03Recepcao,
    rotacao03Saque,
    rotacao04Recepcao,
    rotacao04Saque,
    rotacao05Recepcao,
    rotacao05Saque,
    rotacao06Recepcao,
    rotacao06Saque,
  ]
}

export const ROTATION_STEPS = buildRotationSteps(true)

export function getStepIndexFor(rotation: CourtPosition, phase: RotationPhase): number {
  return (rotation - 1) * 2 + (phase === 'saque' ? 1 : 0)
}

export function getStepByIndex(
  index: number,
  steps: RotationStepConfig[] = ROTATION_STEPS,
): RotationStepConfig {
  const safe = ((index % steps.length) + steps.length) % steps.length
  return steps[safe]
}

export function getStepForRotation(
  rotation: CourtPosition,
  phase: RotationPhase,
  steps: RotationStepConfig[] = ROTATION_STEPS,
): RotationStepConfig {
  const index = getStepIndexFor(rotation, phase)
  return steps[index]
}

export type { RotationStepConfig, VisualSpot } from './types'
