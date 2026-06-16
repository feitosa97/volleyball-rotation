import type { RotationStepConfig } from './types'

export const rotacao04Saque: RotationStepConfig = {
  id: 'r4-saque',
  step: 8,
  rotation: 4,
  phase: 'saque',
  liberoInCourt: true,
  title: 'Rotação 4 — Saque',
  description: 'Sacador: Oposto (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    5: { x: 50, y: 80 },
    6: { x: 18, y: 60 },
    2: { x: 18, y: 12 },
    3: { x: 50, y: 12 },
    4: { x: 82, y: 12 },
  },
  notes: [],
}
