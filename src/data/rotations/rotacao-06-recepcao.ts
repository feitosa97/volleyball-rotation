import type { RotationStepConfig } from './types'

export const rotacao06Recepcao: RotationStepConfig = {
  id: 'r6-recepcao',
  step: 11,
  rotation: 6,
  phase: 'recepcao',
  title: 'Rotação 6 — Recepção',
  description: 'Levantador na zona 6 (centro do fundo). Prepara transição para R1.',
  receiveLine: [1, 5, 6],
  visualOverrides: {
    6: { x: 50, y: 76 },
    1: { x: 82, y: 72 },
    5: { x: 18, y: 72 },
    4: { x: 15, y: 34 },
    3: { x: 50, y: 28 },
    2: { x: 85, y: 34 },
  },
  notes: ['Última rotação antes de voltar à R1', 'Levantamento do fundo central'],
}
