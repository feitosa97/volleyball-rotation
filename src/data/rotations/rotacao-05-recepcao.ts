import type { RotationStepConfig } from './types'

export const rotacao05Recepcao: RotationStepConfig = {
  id: 'r5-recepcao',
  step: 9,
  rotation: 5,
  phase: 'recepcao',
  liberoInCourt: true,
  title: 'Rotação 5 — Recepção',
  description: 'Levantador na zona 5 (esquerda do fundo). Levantamento por penetração.',
  receiveLine: [5, 4, 1],
  visualOverrides: {
    1: { x: 20, y: 65 },
    5: { x: 50, y: 65 },
    2: { x: 15, y: 30 },
    6: { x: 90, y: 86 },
    3: { x: 12, y: 12 },
    4: { x: 80, y: 65 },
  },
  notes: ['Levantador penetra da esquerda.'],
}
