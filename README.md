# vibe-starter

Repo de départ pour une épreuve de **vibe coding chronométrée** (≈40 min, app web full stack, IA autorisée).

Parti pris : **le sujet est un plancher, pas un plafond.** Un agent récent livre le cahier des charges d'un
CRUD en une dizaine de minutes ; deux pages et quatre interactions, n'importe quel dev le fait à la main.
Ce qui distingue en démo, c'est un produit qui ressemble à un vrai outil : beaucoup de fonctionnalités utiles,
qui calculent ce que le tableur ne montre pas, sur des données cohérentes. Le repo est réglé pour ça.

## Ce qu'on a appris (3 essais sur le même sujet)

| Essai | Config | Temps agent | Résultat |
|---|---|---|---|
| foodmart-bi (référence d'Arthur) | omp + Opus, sans starter ni skills, consigne « bluffe-moi » | — | 6 vues, palette Ctrl K, carte, drill-down, vues enregistrées, visite guidée, page méthodologie. Effet wow. |
| Stockly run 1 | starter sobre + skills « minimalistes » (ponytail, karpathy) | 9 min 30 | Cahier des charges + bonus, code propre, mais **3 pages basiques** : rien qu'on ne ferait pas à la main. |
| Stockly run 2 | ce repo (shell riche + `wow-features`) | 14 min 30 | Cahier des charges + bonus + **prévision de rupture, page réassort avec quantités suggérées et réception en un clic, KPI cliquables avec variation vs période précédente, graphique 7/30/90 j cliquable, journal filtrable, courbe de stock 90 j par produit, Ctrl K, raccourcis, thème sombre, page méthodologie**. Même rigueur sur les données (transaction, contrainte `CHECK`, SKU unique, annulation non rejouable). |

Conclusions :
1. **Les skills de sobriété (« le plus petit changement ») sont un contresens ici.** Ils sont faits pour
   modifier un gros codebase existant sans casse ; sur un greenfield de 40 min, ils brident l'agent sur le périmètre.
   Retirés. La propreté vient de règles dures ciblées (validation serveur, transactions, contraintes), pas de « faire moins ».
2. **L'agent ne dépasse le sujet que si on le lui demande explicitement**, avec un catalogue d'idées concrètes
   (`wow-features`) et un objectif de démo. Sans ça, il s'arrête au cahier des charges.
3. **Le prompt du candidat peut rester court** si `AGENTS.md` et les skills portent la méthode. Run 2 = 3 lignes de prompt.
4. **Le shell compte double** : palette, raccourcis, thème sombre et page méthodologie sont déjà câblés,
   l'agent n'a qu'à ajouter une ligne par page/entité. 0 minute dépensée dessus pendant l'épreuve.
5. **Le temps restant est la vraie marge** : 14 min sur 40. Le candidat peut relancer un `wow` de plus, ou passer
   ces minutes à relire, vérifier et répéter la démo : c'est là que se jouent « usage critique de l'IA » et « qualité de la démo ».

## Ce qu'il y a dedans

| Élément | Où | Rôle |
|---|---|---|
| Next.js 16 App Router, TS strict | `src/app` | Front + back dans un seul process ; stack recommandée par OpenAI pour GPT. |
| shadcn/ui (radix) + Tailwind v4 | `src/components/ui` | 35 composants déjà ajoutés (table, dialog, sheet, command, chart, kbd, toggle-group…). |
| Drizzle + SQLite | `src/db` | Zéro service, transactions synchrones, contraintes en base. |
| zod 4, recharts, es-toolkit, date-fns, motion, next-themes, geist | | Validation, graphiques, utilitaires, animations, thème, polices embarquées (pas de réseau requis). |
| **Shell applicatif** | `src/components/app-shell.tsx`, `app-sidebar.tsx`, `command-palette.tsx` | Sidebar repliable, palette **Ctrl K** (recherche globale + actions + navigation), raccourcis `g <lettre>` et `n`, thème sombre, toasts. |
| Points d'extension | `src/lib/nav.ts`, `src/lib/search.ts`, `ACTIONS` | Une ligne par page / entité / action → sidebar, palette et raccourcis à jour. |
| Page méthodologie | `src/app/about/page.tsx` | Stack + alternatives écartées, choix, limites : à remplir en fin d'épreuve, sert de support à « expliquez vos choix ». |
| **Feature de référence `tasks`** | `src/features/tasks` | CRUD complet : liste filtrée dans l'URL, dialog validé serveur (valeurs conservées en cas d'erreur), KPI et graphique cliquables qui ouvrent la liste filtrée. L'agent recopie ce modèle. |
| `AGENTS.md` | racine | Objectif « démo qui impressionne », rythme, architecture, règles dures, définition de « terminé ». |
| Skills | `.agents/skills` | Détectés par Codex (`.agents/skills`) et omp. |
| Sujet | `subjects/stockly.md` | Gestion de stock. |

### Skills

| Skill | Rôle |
|---|---|
| `kickoff` | Sujet → `SPEC.md` : personas et leurs questions, modèle, invariants, **backlog MUST + 10–15 WOW classés**, plan de seed, scénario de démo. N'attend pas de validation. |
| `wow-features` | Catalogue : KPI avec variation, drill-down, prévisions, classements, anomalies, suggestions, sparklines, tiroir détail, édition inline, actions groupées, vues enregistrées, journal d'activité, undo, import/export CSV, rapport imprimable, kanban, carte… avec la façon de les faire dans cette stack. |
| `ship-feature` | Une tranche verticale : schéma → validation → requêtes → actions → UI → nav/palette → seed → vérif → commit. |
| `data-integrity` | Transactions, invariants, historique append-only, annulation. |
| `demo-ready` | Reset, checks, remplissage de `/about`, `DEMO.md` scénarisé. |
| `shadcn` | Skill officiel shadcn (`npx skills add shadcn/ui`). |

## Reproduire chez soi

Prérequis : Node.js ≥ 20 (testé avec 22), npm, git, Codex CLI (`npm i -g @openai/codex`) ou un autre agent.

```bash
git clone <ce-repo> mon-epreuve && cd mon-epreuve
npm install
npm run db:reset      # crée data/app.db et injecte les données de démo
npm run check         # typecheck + lint
npm run dev           # http://localhost:3000 — tester Ctrl K, g t, n, le thème
codex                 # /skills doit lister kickoff, wow-features, ship-feature…
```

<details>
<summary>Recréer from scratch</summary>

```bash
npx create-next-app@latest vibe-starter --ts --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --turbopack --no-react-compiler --yes
cd vibe-starter
npx shadcn@latest init -b radix -p nova -y --no-monorepo
npx shadcn@latest add -y button input label textarea select card table dialog alert-dialog badge \
  sonner chart form field tabs dropdown-menu separator skeleton sheet tooltip checkbox switch \
  popover calendar sidebar breadcrumb empty command kbd toggle-group progress hover-card scroll-area avatar
npm i drizzle-orm better-sqlite3 zod es-toolkit date-fns server-only motion geist
npm i -D drizzle-kit @types/better-sqlite3 tsx
npx skills add shadcn/ui -a codex -y --copy
# puis copier depuis ce repo : AGENTS.md, .agents/skills/*, src/, drizzle.config.ts,
# next.config.ts, eslint.config.mjs et les scripts db:* / typecheck / check de package.json
```

Pièges rencontrés :
- `create-next-app` 16 active `cacheComponents` : `useSearchParams()` hors `<Suspense>` casse le rendu. Désactivé.
- `next/font/google` télécharge les polices au démarrage : sans réseau, la page casse. Remplacé par le paquet `geist`.
- `@hookform/resolvers` est en conflit avec zod 4 : formulaires en `useActionState` + zod serveur.
- React 19 vide les formulaires après une action : les actions renvoient les valeurs saisies avec l'erreur.
- Le `CommandDialog` shadcn actuel doit contenir un `<Command>` explicite.
- Next 16 écrit un bloc dans `AGENTS.md` vers sa doc embarquée : à garder, l'agent évite les API obsolètes.
</details>

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de dev |
| `npm run db:push` | applique `src/db/schema.ts` (pas de fichiers de migration) |
| `npm run db:seed` / `db:reset` | réinjecte les données / recrée la base |
| `npm run check` | typecheck + lint |

Après un `db:reset` avec le serveur lancé : redémarrer le serveur (la connexion SQLite garde l'ancien fichier).

## Le jour J

Prompt de départ (c'est tout) :

```text
Épreuve chronométrée : 40 minutes maximum. Construis l'app décrite ci-dessous dans ce repo, en suivant
AGENTS.md et les skills de .agents/skills. Travaille en autonomie complète.
<coller le sujet>
```

| Minutes | Candidat | Agent |
|---|---|---|
| 0–3 | Lit le sujet à voix haute, annonce la méthode (spec → tranches → wow → démo). | `kickoff` : `SPEC.md` avec backlog WOW. |
| 3–5 | Relit `SPEC.md` à l'écran, commente 2–3 choix (invariants, features retenues). Corrige si besoin. | Démarre la tranche 1. |
| 5–25 | Suit les commits, ouvre l'app après chaque tranche, verbalise ce qu'il vérifie, interrompt si l'agent boucle. | MUST puis WOW, une tranche = un commit. |
| 25–32 | Essaie de casser l'app (survente, double annulation, SKU en double) devant l'examinateur. | Corrige ce qui casse. |
| 32–40 | Démo en suivant `DEMO.md` et `/about`. | `demo-ready` fait. |

Ce qui est évalué autant que le produit : découper avant de coder, relire et corriger l'IA à voix haute,
tester les cas interdits, savoir expliquer chaque choix (la page `/about` sert d'antisèche).

## S'entraîner

`subjects/stockly.md` : cloner (`git clone vibe-starter essai-1`), chrono 40 min, ne pas regarder de solution.
Après chaque essai, ajouter à `AGENTS.md` ou à `wow-features` ce qui a manqué ou ce que l'agent a raté deux fois.
