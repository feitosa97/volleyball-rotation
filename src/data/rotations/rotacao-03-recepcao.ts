import type { RotationStepConfig } from './types'

export const rotacao03Recepcao: RotationStepConfig = {
  id: 'r3-recepcao',
  step: 5,
  rotation: 3,
  phase: 'recepcao',
  liberoInCourt: true,
  title: 'Rotação 3 — Recepção',
  description: 'Levantador na zona 3 (meio da frente). Foco no ataque central.',
  receiveLine: [1, 6, 3],
  visualOverrides: {
    1: { x: 50, y: 65 },
    2: { x: 80, y: 12 },
    5: { x: 65, y: 32 },
    3: { x: 20, y: 65 },
    4: { x: 90, y: 32 },
    6: { x: 80, y: 65 },
  },
  notes: ['Posição triangulo'],
}
