import type { RotationStepConfig } from './types'

/** Rotação 1 — posição de saque. */
export const rotacao01Saque: RotationStepConfig = {
  id: 'r1-saque',
  step: 2,
  rotation: 1,
  phase: 'saque',
  title: 'Rotação 1 — Saque',
  description: 'Sacador na zona 1. Demais jogadores posicionados para cobertura.',
  visualOverrides: {
    1: { x: 82, y: 88 },
    6: { x: 50, y: 70 },
    5: { x: 18, y: 70 },
    4: { x: 15, y: 38 },
    3: { x: 50, y: 32 },
    2: { x: 85, y: 38 },
  },
  notes: ['Sacador inicia atrás da linha de fundo', 'Próximo saque após ponto: quem estiver na P1'],
}
