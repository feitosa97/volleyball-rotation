import type { RotationStepConfig } from './types'

export const rotacao03Saque: RotationStepConfig = {
  id: 'r3-saque',
  step: 6,
  rotation: 3,
  phase: 'saque',
  liberoInCourt: false,
  title: 'Rotação 3 — Saque',
  description: 'Sacador: Central 1 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 75 },
    5: { x: 80, y: 60 },
    3: { x: 15, y: 12 },
    4: { x: 50, y: 12 },
    2: { x: 85, y: 12 },
  },
  notes: ['Pedir pra ponta cobrir posição 5'],
}
