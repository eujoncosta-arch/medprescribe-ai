# MedPrescribe AI — MVP de demonstração

Aplicação Next.js (App Router) + TypeScript + Tailwind CSS. Dados fictícios, sem backend — pensada para validar fluxo e UX antes da implementação real (RAG, motor de segurança, banco de dados).

> Ambiente de demonstração. Não substitui o julgamento clínico do médico nem deve receber dados reais de pacientes.

## Rodando localmente

Requer Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. Login é mock — qualquer clique em "Entrar" funciona.

## Estrutura

```
app/
  layout.tsx            layout raiz (envolve com AppProvider)
  page.tsx               redireciona para /login ou /dashboard
  login/page.tsx
  (app)/                 grupo de rotas autenticadas (sidebar + topbar)
    layout.tsx
    dashboard/page.tsx
    nova-prescricao/page.tsx
    historico/page.tsx
    protocolos/page.tsx
    interacoes/page.tsx
    favoritos/page.tsx
components/               Sidebar, TopBar, primitivos de UI
lib/
  data.ts                 base de dados fictícia (medicamentos, protocolos, interações)
  clinical.ts             motor de segurança clínica + ranqueamento por evidência
  store.tsx               estado global (sessão, especialidade, histórico, favoritos)
```

## Princípio de design do motor de sugestão

O ranking em `lib/clinical.ts` ordena por evidência clínica (`score`) e checa contraindicações antes de qualquer outra coisa — uma opção bloqueada por segurança nunca aparece no topo, mesmo com o filtro institucional ativado. O filtro de priorização por fabricante (Eurofarma) é uma camada opcional, desligada por padrão, que só reordena opções já aprovadas pela checagem de segurança, e sempre exibe um aviso indicando que aquela ordem reflete política institucional, não conclusão clínica.

## Deploy no Vercel

1. Crie um repositório (GitHub, GitLab ou Bitbucket) e suba esta pasta:
   ```bash
   git init
   git add .
   git commit -m "MedPrescribe AI MVP"
   git remote add origin <url-do-seu-repositorio>
   git push -u origin main
   ```
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. O Vercel detecta automaticamente que é um projeto Next.js — não é necessário configurar build command nem output directory.
4. Clique em **Deploy**. A cada novo `git push` na branch principal, o Vercel gera um novo deploy automaticamente.

Nenhuma variável de ambiente é necessária nesta versão (não há backend nem chaves de API).

## Próximos passos sugeridos

- Substituir `lib/data.ts` por chamadas a uma API real conectada à base de bulas (RAG).
- Persistir histórico e favoritos em banco de dados em vez de estado em memória.
- Implementar autenticação real (NextAuth ou similar) no lugar do login mock.
- Implementar exportação de PDF da prescrição.
