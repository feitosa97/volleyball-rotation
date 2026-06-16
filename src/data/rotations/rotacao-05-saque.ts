import type { RotationStepConfig } from './types'

export const rotacao05Saque: RotationStepConfig = {
  id: 'r5-saque',
  step: 10,
  rotation: 5,
  phase: 'saque',
  liberoInCourt: true,
  title: 'Rotação 5 — Saque',
  description: 'Sacador: Ponta 2 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 80, y: 60 },
    5: { x: 18, y: 60 },
    4: { x: 15, y: 12 },
    2: { x: 50, y: 12 },
    3: { x: 85, y: 12 },
  },
  notes: [],
}
