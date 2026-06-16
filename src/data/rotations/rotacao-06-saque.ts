import type { RotationStepConfig } from './types'

export const rotacao06Saque: RotationStepConfig = {
  id: 'r6-saque',
  step: 12,
  rotation: 6,
  phase: 'saque',
  liberoInCourt: false,
  title: 'Rotação 6 — Saque',
  description: 'Sacador: Central 2 (P1). Próximo ponto → rotação 1.',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 80 },
    5: { x: 80, y: 60 },
    3: { x: 15, y: 12 },
    4: { x: 50, y: 12 },
    2: { x: 85, y: 12 },
  },
  notes: ['Pedir para ponteiro(a) cobrir 5 para bola de primeira.'],
}
