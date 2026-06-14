import type { RotationStepConfig } from './types'
import { rotacao01Recepcao } from './rotacao-01-recepcao'
import { rotacao01Saque } from './rotacao-01-saque'
import { rotacao02Recepcao } from './rotacao-02-recepcao'
import { rotacao02Saque } from './rotacao-02-saque'
import { rotacao03Recepcao } from './rotacao-03-recepcao'
import { rotacao03Saque } from './rotacao-03-saque'
import { rotacao04Recepcao } from './rotacao-04-recepcao'
import { rotacao04Saque } from './rotacao-04-saque'
import { rotacao05Recepcao } from './rotacao-05-recepcao'
import { rotacao05Saque } from './rotacao-05-saque'
import { rotacao06Recepcao } from './rotacao-06-recepcao'
import { rotacao06Saque } from './rotacao-06-saque'

/** 12 passos: recepção e saque para cada uma das 6 rotações. */
export const ROTATION_STEPS: RotationStepConfig[] = [
  rotacao01Recepcao,
  rotacao01Saque,
  rotacao02Recepcao,
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

export function getStepByIndex(index: number): RotationStepConfig {
  const safe = ((index % 12) + 12) % 12
  return ROTATION_STEPS[safe]
}

export function getStepForRotation(
  rotation: RotationStepConfig['rotation'],
  phase: RotationStepConfig['phase'],
): RotationStepConfig {
  return ROTATION_STEPS.find((s) => s.rotation === rotation && s.phase === phase)!
}

export type { RotationStepConfig, VisualSpot } from './types'
