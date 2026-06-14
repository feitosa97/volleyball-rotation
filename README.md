# Vôlei 5×1 — Rotação

App web mobile-first para ajudar equipes de vôlei com o sistema **5×1** (um levantador, cinco atacantes).

## Funcionalidades

- **Início** — cadastro do elenco (incluindo líbero), escalação inicial e situação da bola (ganhamos/perdemos)
- **Escalação** — trocar posições, editar elenco e reiniciar o planejamento
- **Exibição** — 12 passos (recepção + saque para cada rotação) com meia quadra, linha de 3 e rede
- **Partida** — acompanhamento da rotação ao vivo com controle de saque
- **Persistência** — dados salvos no `localStorage` do navegador
- **Idioma** — português brasileiro

## Início rápido

```powershell
cd volleyball-rotation
npm install
npm run dev
```

Abra a URL exibida no terminal (geralmente **http://localhost:5173**).

## Publicar online

### Vercel / Netlify

```powershell
npm run build
```

Faça deploy da pasta `dist`. O projeto inclui `vercel.json` para SPA.

### GitHub Pages

```powershell
npm run build
```

Publique o conteúdo de `dist` (base relativa `./` já configurada no Vite).

## Configurar posições por rotação

Cada passo da exibição está em um arquivo separado em `src/data/rotations/`:

| Arquivo | Passo |
|---------|-------|
| `rotacao-01-recepcao.ts` | R1 recepção |
| `rotacao-01-saque.ts` | R1 saque |
| … | … |
| `rotacao-06-saque.ts` | R6 saque |

Edite `visualOverrides`, `receiveLine` e `notes` em cada arquivo para ajustar posições na quadra.

## Como usar

1. No **Início**, cadastre jogadores e escalação. Indique se ganharam ou perderam a bola e a rotação atual.
2. Na **Escalação**, troque posições tocando em duas zonas ou edite o elenco.
3. Na **Exibição**, navegue pelos 12 passos para ver formações de recepção e saque.
4. Na **Partida**, acompanhe a rotação durante o jogo.

## Papéis

| Função | Sigla |
|--------|-------|
| Levantador | S |
| Ponta | OH |
| Oposto | OPP |
| Central | MB |
| Líbero | L |
