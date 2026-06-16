import type { RotationStepConfig } from './types'

/** Rotação 1 — posição de saque. */
export const rotacao01Saque: RotationStepConfig = {
  id: 'r1-saque',
  step: 2,
  rotation: 1,
  phase: 'saque',
  liberoInCourt: true,
  title: 'Rotação 1 — Saque',
  description: 'Sacador na zona 1. Demais jogadores posicionados para cobertura.',
  visualOverrides: {
    1: { x: 82, y: 88 },
    5: { x: 50, y: 75 },
    6: { x: 18, y: 60 },
    2: { x: 15, y: 12 },
    3: { x: 50, y: 12 },
    4: { x: 85, y: 12 },
  },
  notes: ['Ponteiro(a) e Oposto(a) atacam invertidos(as).'],
}
