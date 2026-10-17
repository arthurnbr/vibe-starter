# vibe-starter

Repo de départ pour une épreuve de **vibe coding chronométrée** (≈40 min, app web full stack, IA autorisée).
Tout ce qui peut être décidé ou installé avant l'épreuve l'est déjà : stack, composants, base de données,
une fonctionnalité de référence que l'agent recopie, des skills qui cadrent l'agent, et un sujet d'entraînement.

## Ce qu'il y a dedans

| Élément | Où | Pourquoi |
|---|---|---|
| Next.js 16 App Router, TS strict | `src/app` | Front + back dans un seul process. Stack la mieux connue des modèles GPT (recommandée par OpenAI pour le frontend). |
| shadcn/ui (radix, preset Nova) + Tailwind v4 | `src/components/ui` | 26 composants déjà ajoutés (table, dialog, field, chart, sonner, empty…). Le code est dans le repo, l'agent le lit. |
| Drizzle ORM + SQLite (better-sqlite3) | `src/db` | Zéro service à lancer, un fichier `data/app.db`. Transactions synchrones simples. |
| zod 4 | `src/features/*/validation.ts` | Même schéma pour le formulaire, l'action serveur et les filtres d'URL. |
| recharts via shadcn `chart` | `src/features/tasks/status-chart.tsx` | Graphiques cohérents avec le thème. |
| es-toolkit, date-fns, lucide-react, sonner | | Utilitaires (lodash moderne), dates, icônes, toasts. |
| **Feature de référence `tasks`** | `src/features/tasks`, `src/app/tasks`, `src/app/page.tsx` | CRUD complet : liste filtrée via l'URL, dialog de formulaire validé côté serveur, suppression confirmée, KPI + graphique, seed. **L'agent copie ce modèle.** |
| `AGENTS.md` | racine | Lu automatiquement par Codex (et omp, Claude Code…). Stack figée, architecture, règles, définition de « terminé ». |
| Skills | `.agents/skills` | Voir ci-dessous. Format standard `SKILL.md`, détecté par Codex dans `.agents/skills`. |
| Sujet d'entraînement | `subjects/stockly.md` | Gestion de stock : CRUD, invariants (stock jamais négatif), historique, dashboard. |

### Skills

| Skill | Rôle | Source |
|---|---|---|
| `kickoff` | Cahier des charges → `SPEC.md` d'une page (entités, invariants, écrans, MUST/SHOULD/BONUS, cut list) | maison |
| `ship-feature` | Une tranche verticale complète en recopiant `src/features/tasks` | maison |
| `data-integrity` | Transactions, invariants, historique append-only, annulation | maison |
| `demo-ready` | Passe finale : reset seed, checks, script de démo `DEMO.md` | maison |
| `ponytail` | Discipline « lazy senior dev » : le plus petit changement complet | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT) |
| `karpathy-guidelines` | Simplicité, changements chirurgicaux, critères vérifiables | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT) |
| `shadcn` | Skill officiel shadcn : contexte projet, règles de composition, CLI | `npx skills add shadcn/ui` |

## Reproduire chez soi

Prérequis : Node.js ≥ 20 (testé avec 22), npm, git. Codex CLI (`npm i -g @openai/codex`) ou un autre agent.

### Option A — cloner ce repo

```bash
git clone <ce-repo> mon-epreuve && cd mon-epreuve
npm install
npm run db:reset      # crée data/app.db et injecte les données de démo
npm run dev           # http://localhost:3000
```

### Option B — tout recréer from scratch

```bash
npx create-next-app@latest vibe-starter --ts --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --turbopack --no-react-compiler --yes
cd vibe-starter
npx shadcn@latest init -b radix -p nova -y --no-monorepo
npx shadcn@latest add -y button input label textarea select card table dialog alert-dialog badge \
  sonner chart form field tabs dropdown-menu separator skeleton sheet tooltip checkbox switch \
  popover calendar sidebar breadcrumb empty
npm i drizzle-orm better-sqlite3 zod es-toolkit date-fns server-only
npm i -D drizzle-kit @types/better-sqlite3 tsx
npx skills add shadcn/ui -a codex -y --copy      # skill officiel shadcn
# puis copier depuis ce repo : AGENTS.md, .agents/skills/*, src/db, src/lib, src/features,
# src/app, src/components/app-nav.tsx, drizzle.config.ts, next.config.ts, eslint.config.mjs,
# et les scripts "db:*", "typecheck", "check" de package.json
```

Points non évidents rencontrés en le montant :
- `create-next-app` 16 active `cacheComponents` : `useSearchParams()` hors `<Suspense>` casse alors le rendu.
  Désactivé dans `next.config.ts` (app interne 100 % dynamique, on n'en a pas besoin en 40 min).
- `@hookform/resolvers` a un conflit de peer deps avec zod 4 via npm : on s'en passe, les formulaires
  utilisent `useActionState` + validation zod côté serveur (moins de code, une seule source de vérité).
- Next 16 génère un bloc dans `AGENTS.md` qui pointe vers la doc embarquée `node_modules/next/dist/docs/` :
  à garder, c'est ce qui évite à l'agent d'utiliser des API Next obsolètes.

### La veille de l'épreuve

```bash
npm install && npm run db:reset && npm run check && npm run dev   # tout doit être vert
codex                                                               # vérifier que /skills liste les skills
```

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de dev |
| `npm run db:push` | applique `src/db/schema.ts` à la base (pas de fichiers de migration) |
| `npm run db:seed` | vide et réinjecte les données de démo |
| `npm run db:reset` | supprime la base, push, seed |
| `npm run check` | typecheck + lint |

## Méthode pendant les 40 minutes

| Minutes | Phase | Prompt type |
|---|---|---|
| 0–5 | Cadrage, à voix haute | `$kickoff` + coller le sujet. Relire `SPEC.md`, corriger les hypothèses. |
| 5–10 | Modèle + seed | `$ship-feature` schéma + seed de <entité>. Done when: db:reset passe, données réalistes incl. cas limites. |
| 10–30 | Tranches verticales | Une fonctionnalité à la fois (voir gabarit). Lancer l'app après chaque tranche. |
| 30–35 | Finition | Bonus seulement si tout le MUST marche. `/review` sur le diff. |
| 35–40 | Démo | `$demo-ready`, puis dérouler `DEMO.md`. |

Gabarit de prompt (structure recommandée par la doc Codex : Goal / Context / Constraints / Done when) :

```text
Goal: <fonctionnalité>.
Context: follow src/features/tasks; schema in src/db/schema.ts; SPEC.md section <x>.
Constraints: shadcn components only, zod on the server, one transaction per business write, no new deps.
Done when: npm run check passes, flow works with seed data, empty/error states present.
```

Pendant l'épreuve, ce qui est évalué autant que le résultat :
- découper avant de prompter, et le dire ;
- relire chaque diff et verbaliser les corrections (« il a vérifié le stock hors transaction, je corrige ») ;
- couper l'agent après deux échecs sur le même point, réduire ou écrire à la main ;
- une app qui marche de bout en bout > beaucoup de features à moitié faites.

## S'entraîner

`subjects/stockly.md` contient un sujet complet. Pour une simulation : copier le repo
(`git clone vibe-starter essai-1`), lancer un chrono de 40 min, et ne pas regarder de solution avant la fin.
Après chaque essai, ajouter à `AGENTS.md` les erreurs que l'agent a répétées.
