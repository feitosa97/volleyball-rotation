import type { RotationStepConfig } from './types'

export const rotacao06Saque: RotationStepConfig = {
  id: 'r6-saque',
  step: 12,
  rotation: 6,
  phase: 'saque',
  title: 'Rotação 6 — Saque',
  description: 'Sacador: Central 2 (P1). Próximo ponto → rotação 1.',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 68 },
    5: { x: 18, y: 70 },
    4: { x: 15, y: 34 },
    3: { x: 50, y: 28 },
    2: { x: 85, y: 34 },
  },
  notes: ['Central 2 saca na zona 1', 'Após ganhar o saque, o time roda para a Rotação 1 (Levantador saca)'],
}
