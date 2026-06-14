import type { RotationStepConfig } from './types'

export const rotacao04Saque: RotationStepConfig = {
  id: 'r4-saque',
  step: 8,
  rotation: 4,
  phase: 'saque',
  title: 'Rotação 4 — Saque',
  description: 'Sacador: Oposto (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 72 },
    5: { x: 18, y: 72 },
    4: { x: 18, y: 32 },
    3: { x: 50, y: 28 },
    2: { x: 82, y: 32 },
  },
  notes: ['Oposto saca na zona 1'],
}
