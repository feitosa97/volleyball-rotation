import type { RotationStepConfig } from './types'

/** Rotação 2 — recepção alternativa (oposto inverte com ponteiro). */
export const rotacao02RecepcaoAlt: RotationStepConfig = {
  id: 'r2-recepcao-alt',
  step: 3,
  rotation: 2,
  phase: 'recepcao',
  title: 'Rotação 2 — Recepção (oposto inverte)',
  description: 'Formação alternativa com oposto e ponteiro invertidos na recepção.',
  receiveLine: [1, 5, 4],
  liberoInCourt: true,
  visualOverrides:{
    1: { x: 78, y: 55 },
    5: { x: 50, y: 55 },
    6: { x: 90, y: 81 },
    4: { x: 20, y: 55 },
    2: { x: 50, y: 23 },
    3: { x: 8, y: 23 },
  },
  notes: ['Oposto(a) inverte com ponteiro(a).'],
}
