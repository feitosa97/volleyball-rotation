import type { RotationStepConfig } from './types'

export const rotacao03Recepcao: RotationStepConfig = {
  id: 'r3-recepcao',
  step: 5,
  rotation: 3,
  phase: 'recepcao',
  title: 'Rotação 3 — Recepção',
  description: 'Levantador na zona 3 (meio da frente). Foco no ataque central.',
  receiveLine: [1, 6, 5],
  visualOverrides: {
    1: { x: 50, y: 65 },
    6: { x: 80, y: 12 },
    5: { x: 65, y: 32 },
    4: { x: 20, y: 65 },
    3: { x: 90, y: 32 },
    2: { x: 80, y: 65 },
  },
  notes: ['Pipe disponível do fundo', 'Dois pontas + oposto atacando'],
}
