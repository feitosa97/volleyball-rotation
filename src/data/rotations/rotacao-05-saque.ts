import type { RotationStepConfig } from './types'

export const rotacao05Saque: RotationStepConfig = {
  id: 'r5-saque',
  step: 10,
  rotation: 5,
  phase: 'saque',
  title: 'Rotação 5 — Saque',
  description: 'Sacador: Ponta 2 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 70 },
    5: { x: 18, y: 68 },
    4: { x: 15, y: 36 },
    3: { x: 50, y: 30 },
    2: { x: 85, y: 36 },
  },
  notes: ['Ponta 2 saca na zona 1'],
}
