import type { RotationStepConfig } from './types'

export const rotacao02Recepcao: RotationStepConfig = {
  id: 'r2-recepcao',
  step: 3,
  rotation: 2,
  phase: 'recepcao',
  title: 'Rotação 2 — Recepção',
  description: 'Levantador na zona 2 (frente). Recepção com linha de 3 ajustada.',
  receiveLine: [1, 5, 6],
  visualOverrides: {
    5: { x: 78, y: 55 },
    2: { x: 50, y: 55 },
    6: { x: 90, y: 81 },
    3: { x: 20, y: 55 },
    4: { x: 12, y: 33 },
    1: { x: 8, y: 12 },
  },
  notes: ['Levantador levanta da frente', 'Central ataca pelo meio'],
}
