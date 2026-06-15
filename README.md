# Koda — SEO Dashboard

<p align="center">
  <strong>Dashboard administrativo para analise de metricas de SEO e trafego organico.</strong>
  <br>
  Visualize cliques, impressoes, CTR, posicionamento, backlinks e tendencias com dados em tempo real.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Svelte%205-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte 5">
  <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
</p>

---

## Sobre

**Koda** e um dashboard de SEO de alto nivel construido com SvelteKit 5, utilizando as novas runes ($state, $derived) para estado reativo e performatico. Os dados sao simulados com Faker.js para demonstrar metricas de trafego organico, keywords, backlinks e tendencias sem necessidade de backend.

---

## Tech Stack

### Frontend

| Tecnologia | Proposito |
|---|---|
| **SvelteKit (Svelte 5)** | Framework com runes ($state, $derived, $effect) |
| **TypeScript** | Tipagem estatica |
| **Tailwind CSS 3** | Estilizacao utilitaria |
| **Vite 8** | Build tool e dev server |
| **Chart.js** | Graficos de linha, barra e tendencias |
| **bits-ui** | Componentes de UI (Shadcn-Svelte) |
| **Lucide Svelte** | Iconografia |
| **Faker.js** | Dados mock realistas |
| **jsPDF + jspdf-autotable** | Exportacao de relatorios em PDF |

### Infraestrutura & Ferramentas

| Tecnologia | Proposito |
|---|---|
| **Netlify** | Deploy e hosting |
| **Docker + docker-compose** | Containerizacao |
| **Vitest + Testing Library** | Testes unitarios |
| **PostCSS + Autoprefixer** | Processamento CSS |
| **svelte-check** | Verificacao de tipos |

---

## Funcionalidades

- **Metricas de Desempenho** — Cliques, impressoes, CTR e posicao media com indicadores de tendencia
- **Graficos Interativos** — Performance ao longo do tempo com Chart.js
- **Analise de Keywords** — Filtros por dificuldade e ordenacao
- **Monitoramento de Backlinks** — Dominios referenciadores e metricas de autoridade
- **Tendencias Historicas** — Comparacao entre periodos
- **Interface Trilíngue** — PT-BR, EN-US, Espanhol com Dark Mode
- **Exportacao de Dados** — CSV e PDF com jsPDF
- **Filtro de Periodo** — 7 dias, 30 dias, 3 meses com regeneracao de dados

---

## Estrutura do Projeto

```
koda-app/
  src/
    lib/                 Componentes e utilitarios
    routes/              Paginas e rotas (SvelteKit)
    test/                Testes unitarios
    app.css              Estilos globais
    app.html             Template HTML
  static/                Assets estaticos
  tests/                 Testes de integracao
  build/                 Build de producao
  svelte.config.js       Configuracao SvelteKit
  vite.config.ts         Configuracao Vite
  vitest.config.ts       Configuracao de testes
  tailwind.config.js     Configuracao Tailwind
  Dockerfile             Imagem Docker
  docker-compose.yml     Orquestracao de containers
  netlify.toml           Configuracao Netlify
```

---

<p align="center">
  <br>
  <sub>Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank"><strong>Capybara Holding</strong></a></sub>
  <br>
  <sub>&copy; 2026 Koda App. Todos os direitos reservados.</sub>
</p>
