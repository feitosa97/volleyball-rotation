import type { RotationStepConfig } from './types'

export const rotacao06Recepcao: RotationStepConfig = {
  id: 'r6-recepcao',
  step: 11,
  rotation: 6,
  phase: 'recepcao',
  liberoInCourt: true,
  title: 'Rotação 6 — Recepção',
  description: 'Levantador na zona 6 (centro do fundo). Prepara transição para R1.',
  receiveLine: [1, 3, 6],
  visualOverrides: {
    1: { x: 50, y: 65 },
    6: { x: 82, y: 65 },
    3: { x: 18, y: 65 },
    4: { x: 90, y: 34 },
    5: { x: 65, y: 85 },
    2: { x: 75, y: 14 },
  },
  notes: ['Central infiltra pela direita.', 'Oposto(a) à esquera do(a) ponteiro(a).'],
}
