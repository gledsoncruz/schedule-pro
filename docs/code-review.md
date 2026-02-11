# Revisão técnica do projeto `schedule-pro`

Data: 2026-02-11

## Resumo executivo

A base está bem organizada para um app Next.js com Prisma, mas hoje há problemas de **qualidade de build/lint**, alguns pontos de **consistência de domínio** e oportunidades de melhoria em **segurança/observabilidade**.

## Achados priorizados

### P0 — Corrigir erros que quebram o lint

1. **`setState` dentro de `useEffect` (regra `react-hooks/set-state-in-effect`)** em `profile.tsx`.
   - Recomenda-se trocar por inicialização via `useMemo`/estado derivado para `hours` e `timeZones`.
2. **Componente criado durante render (regra `react-hooks/static-components`)** em `header.tsx`.
   - Extraia `NavLinks` para fora de `Header` e passe props (`navItems`, `status`, `session`, handlers).
3. **Non-null assertion insegura** em `services/page.tsx` (`session.user?.id!`).
   - Garanta `session.user.id` antes de renderizar e faça `redirect`/throw se ausente.
4. **`prefer-const`** em `src/lib/prisma.ts` para `globalWithPrisma`.

### P1 — Reduzir warnings e dívida técnica imediata

1. Remover imports não usados (`FormDescription`, `Settings`, etc.).
2. Em `get-all-services.ts`, logar erro real no `catch` e padronizar retorno (ex.: `Result<T, E>`).
3. Em `profile.tsx`, há estado redundante (`labelBtnSelectHours`) que pode ser derivado de `selectedHours.length`.

### P2 — Melhorias de domínio e dados

1. `User.subscriptionId` parece redundante com a relação `Subscription.userId @unique`.
   - Avaliar remover para evitar duplicidade de fonte de verdade.
2. Adicionar índices nas consultas frequentes:
   - `Service.userId + status` (consulta em `get-all-services.ts`).
   - `Appointment.userId + appointmentDate` para agenda.
3. `times` como `String[]` funciona, mas pode ficar mais robusto com validação de formato `HH:mm` no backend.

### P3 — Qualidade operacional

1. Adicionar scripts de qualidade no `package.json`:
   - `typecheck`: `tsc --noEmit`
   - `lint:fix`: `eslint . --fix`
2. Criar pipeline CI mínima (lint + typecheck + build).
3. Melhorar README com seção “Troubleshooting” para erro de lint e conexão com banco.

## Plano de ação sugerido (curto prazo)

1. Corrigir 6 erros de lint atuais.
2. Zerar warnings mais simples (imports não usados).
3. Adicionar `typecheck` e CI básica.
4. Revisar modelagem (`subscriptionId` redundante) e aplicar migration.
