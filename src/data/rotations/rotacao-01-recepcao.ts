import type { RotationStepConfig } from './types'

/** Rotação 1 — recepção de saque adversário. */
export const rotacao01Recepcao: RotationStepConfig = {
  id: 'r1-recepcao',
  step: 1,
  rotation: 1,
  phase: 'recepcao',
  title: 'Rotação 1 — Recepção',
  description: 'Levantador na zona 1. Linha de 3 com pontas e central.',
  receiveLine: [5, 6, 1],
  visualOverrides: {
    5: { x: 78, y: 55 },
    6: { x: 50, y: 55 },
    1: { x: 86, y: 12 },
    4: { x: 20, y: 55 },
    3: { x: 12, y: 12 },
    2: { x: 36, y: 75 },
  },
  notes: ['Levantador recua para levantar da zona 1', 'Oposto ataca pela direita'],
}
