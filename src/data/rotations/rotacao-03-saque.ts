import type { RotationStepConfig } from './types'

export const rotacao03Saque: RotationStepConfig = {
  id: 'r3-saque',
  step: 6,
  rotation: 3,
  phase: 'saque',
  title: 'Rotação 3 — Saque',
  description: 'Sacador: Central 1 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 70 },
    5: { x: 18, y: 70 },
    4: { x: 15, y: 34 },
    3: { x: 50, y: 28 },
    2: { x: 85, y: 34 },
  },
  notes: ['Central 1 saca na zona 1'],
}
