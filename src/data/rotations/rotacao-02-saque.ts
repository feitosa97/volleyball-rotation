import type { RotationStepConfig } from './types'

export const rotacao02Saque: RotationStepConfig = {
  id: 'r2-saque',
  step: 4,
  rotation: 2,
  phase: 'saque',
  liberoInCourt: true,
  title: 'Rotação 2 — Saque',
  description: 'Sacador: Ponta 1 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 80, y: 62 },
    5: { x: 18, y: 62 },
    4: { x: 12, y: 12 },
    2: { x: 50, y: 12 },
    3: { x: 88, y: 12 },
  },
  notes: [],
}
