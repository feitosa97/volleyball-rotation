import type { RotationStepConfig } from './types'

export const rotacao04Recepcao: RotationStepConfig = {
  id: 'r4-recepcao',
  step: 7,
  rotation: 4,
  phase: 'recepcao',
  title: 'Rotação 4 — Recepção',
  description: 'Levantador na zona 4 (esquerda da frente). Slide e ataque de fundo.',
  receiveLine: [6, 1, 5],
  visualOverrides: {
    6: { x: 80, y: 65 },
    1: { x: 50, y: 65 },
    5: { x: 83, y: 22 },
    4: { x: 36, y: 32 },
    3: { x: 20, y: 65 },
    2: { x: 12, y: 22 },
  },
  notes: ['Levantador levanta da zona 4', 'Ataque de pipe do fundo'],
}
