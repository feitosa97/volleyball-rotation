import type { RotationStepConfig } from './types'

export const rotacao02Saque: RotationStepConfig = {
  id: 'r2-saque',
  step: 4,
  rotation: 2,
  phase: 'saque',
  title: 'Rotação 2 — Saque',
  description: 'Sacador: Ponta 1 (P1).',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 72 },
    5: { x: 18, y: 72 },
    4: { x: 12, y: 36 },
    3: { x: 50, y: 30 },
    2: { x: 88, y: 36 },
  },
  notes: ['Ponta 1 saca na zona 1', 'Levantador na rede pronto para bloqueio'],
}
