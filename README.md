# vibe-starter

Repo de départ pour une épreuve de **vibe coding chronométrée** (≈40 min, app web full stack, IA autorisée).

Parti pris : **le sujet décrit des données ; le candidat doit livrer un outil.** Un agent récent livre le cahier
des charges d'un CRUD en une douzaine de minutes. Ce qui distingue en démo, ce n'est ni le nombre d'écrans ni le
vernis (palette, thème sombre) : ce sont des écrans **en forme de tâche** qui font gagner du temps ou évitent une
erreur à l'utilisateur, sur des données cohérentes. Le repo est réglé pour ça.

## Ce qu'on a appris (5 essais, prompt de 3 lignes à partir du run 2)

| Essai | Config | Temps | Résultat | Critique |
|---|---|---|---|---|
| foodmart-bi (référence d'Arthur) | omp + Opus, sans starter, « bluffe-moi » | — | 6 vues analytiques, carte, drill-down, vues enregistrées, visite guidée. | Effet wow par le volume ; sujet de BI, donc lecture seule. |
| Run 1 | starter sobre + skills « minimalistes » (ponytail, karpathy) | 9 min 30 | Cahier des charges + bonus, code propre. | **3 pages basiques**, rien qu'on ne ferait pas à la main. |
| Run 2 | shell riche + skill `wow-features` | 14 min 30 | + prévision de rupture, réassort, KPI avec variation, journal, courbe 90 j, Ctrl K. | Propre, mais **les écrans restent des listes + un formulaire avec les champs de la table** : un carnet de notes enrichi, des features « pour faire wow ». |
| Run 3 | `kickoff` = journée de l'utilisateur → workflows ; skill `workflow-screens` ; écran de saisie multi-lignes de référence | 13 min 30 | Accueil « À traiter », réassort → réception pré-remplie de 11 lignes en une transaction, saisie du soir multi-lignes, inventaire attendu / compté. | Les écrans suivent le métier, mais **digitalisent le processus actuel** ; trop de raccourcis clavier une touche ; look shadcn gris par défaut. |
| Run 4 (**nouveau sujet : Fournil**, boulangerie) | `kickoff` = « réinventer, pas digitaliser » (avant → après) ; skill `art-direction` + polices hors ligne ; raccourcis supprimés sauf Ctrl K ; patterns de vues du domaine | 10 min 40 | **Identité** : ticket kraft, Fraunces + DM Sans + mono, croûte dorée / farine / framboise. **Journée** = frise des créneaux avec charge (17 h complet en rouge) + colonnes à préparer → prête → retirée, non-retirés à rappeler en tête. **Commande** : téléphone → client reconnu, « reprendre sa dernière commande » ; créneaux passés/complets désactivés, produits grisés avec « possible dès mar. 16 h » ; acompte suggéré. **Fournée** du jour calculée, triée par premier retrait, imprimable. Ticket imprimable. | L'app **change la façon de faire** (l'app refuse avant le client, calcule la production, lisse les retraits). Reste : page client publique rejetée « hors délai » alors qu'il restait 29 min → règle « use the time » ajoutée. |

Conclusions :
1. **Concevoir à partir des données donne un carnet de notes**, même avec beaucoup de features. Le levier qui a
   changé la nature du résultat : faire écrire à l'agent la **journée de l'utilisateur** (moment, ce qu'il a en main,
   ce qui est pénible aujourd'hui) avant toute feature, et rejeter toute feature « liste + formulaire des champs de la table ».
2. **Donner un écran de référence non-CRUD** (saisie multi-lignes en une transaction) : l'agent recopie les
   patterns qu'il voit. Sans exemple, il retombe sur le dialogue un-enregistrement.
3. **Le vernis n'est pas une feature, et les raccourcis une touche sont du bruit** : en 40 min ils sont mal faits,
   invisibles en démo et gênent la saisie. Seul Ctrl K (palette) reste.
4. **Les skills de sobriété (ponytail, karpathy) brident un greenfield de 40 min** ; la propreté vient de règles
   dures (validation serveur, transactions, contraintes), qui ont tenu sur les 3 runs.
5. **Le prompt du candidat reste court** (3 lignes) : la méthode est dans `AGENTS.md` et les skills.
6. **L'agent sous-estime le temps disponible** : il coupe « par prudence » ce qui ferait la différence (runs 3 et 4).
   `AGENTS.md` impose maintenant de continuer tant qu'il reste plus de 10 min, et le SPEC a une « phase 2 » au lieu de « rejeté faute de temps ».
7. **Digitaliser ≠ réinventer.** Le saut du run 4 vient de la question « que peut décider l'app à la place de
   l'utilisateur, que sait-elle qu'il ne voit pas ? » et de vues du domaine (créneaux, étapes, production) au lieu de tables.
8. **La personnalité se décide en 5 min, une fois** : 3 mots d'ambiance, un objet de référence du métier, un élément
   signature, une paire de polices. Ensuite chaque écran en hérite.

## Ce qu'il y a dedans

| Élément | Où | Rôle |
|---|---|---|
| Next.js 16 App Router, TS strict | `src/app` | Front + back dans un seul process ; stack recommandée par OpenAI pour GPT. |
| shadcn/ui (radix) + Tailwind v4 | `src/components/ui` | 35 composants déjà ajoutés (table, dialog, sheet, command, chart, kbd, toggle-group…). |
| Drizzle + SQLite | `src/db` | Zéro service, transactions synchrones, contraintes en base. |
| zod 4, recharts, es-toolkit, date-fns, motion, next-themes, geist | | Validation, graphiques, utilitaires, animations, thème, polices embarquées (pas de réseau requis). |
| **Shell applicatif** | `src/components/app-shell.tsx`, `app-sidebar.tsx`, `command-palette.tsx` | Sidebar repliable, palette **Ctrl K** (recherche globale + actions + navigation), thème sombre, toasts. Aucun autre raccourci clavier. |
| Points d'extension | `src/lib/nav.ts`, `src/lib/search.ts`, `ACTIONS` | Une ligne par page / entité / action → sidebar et palette à jour. |
| Page méthodologie | `src/app/about/page.tsx` | Stack + alternatives écartées, choix, limites : à remplir en fin d'épreuve, sert de support à « expliquez vos choix ». |
| **Feature de référence `tasks`** | `src/features/tasks` | CRUD complet (liste filtrée dans l'URL, dialog validé serveur, KPI et graphique cliquables) **et un écran de saisie multi-lignes** (`/tasks/batch`) : lignes en état client, payload typé, une transaction, erreurs par ligne. L'agent recopie ces modèles. |
| `AGENTS.md` | racine | Objectif « un outil qui travaille pour l'utilisateur », rythme, architecture, règles dures, définition de « terminé ». |
| Skills | `.agents/skills` | Détectés par Codex (`.agents/skills`) et omp. |
| Sujets | `subjects/stockly.md`, `subjects/fournil.md` | Gestion de stock ; commandes de boulangerie. |
| Polices | `@fontsource-variable/*` | Bricolage Grotesque, Fraunces, Space Grotesk, Instrument Sans, Manrope, DM Sans, JetBrains Mono, embarquées (pas de réseau). |

### Skills

| Skill | Rôle |
|---|---|
| `kickoff` | Sujet → `SPEC.md` : journée actuelle de l'utilisateur → **avant / après** (ce que l'app décide, pré-remplit, refuse avant l'erreur) → workflows autour des objets du métier, couverture du sujet, modèle, direction artistique, phase 2, démo = la nouvelle journée. |
| `art-direction` | En 5 min : ambiance, objet de référence du métier, élément signature, paire de polices, palette OKLCH, ton des textes. |
| `workflow-screens` | Patterns d'écrans en forme de tâche : saisie multi-lignes, attendu vs réel avec motif d'écart, documents à cycle de vie (commande, inventaire, retour), page « À traiter » avec actions, recommandations explicables, valeurs par défaut et garde-fous. |
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
npm run dev           # http://localhost:3000 — tester Ctrl K et le thème
codex                 # /skills doit lister kickoff, workflow-screens, ship-feature…
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
| 0–3 | Lit le sujet à voix haute, annonce la méthode : « je pars de la journée du gérant, pas des tables ». | `kickoff` : `SPEC.md` (journée, workflows, décisions). |
| 3–5 | Relit `SPEC.md` à l'écran : commente la journée et 2–3 workflows retenus / rejetés. Corrige si besoin. | Démarre le workflow 1. |
| 5–25 | Suit les commits, ouvre l'app après chaque workflow, verbalise ce qu'il vérifie, interrompt si l'agent boucle. | Workflows du sujet, puis document implicite (commande, inventaire). |
| 25–32 | Essaie de casser l'app (survente, double annulation, SKU en double) devant l'examinateur. | Corrige ce qui casse. |
| 32–40 | Démo en suivant `DEMO.md` et `/about`. | `demo-ready` fait. |

Ce qui est évalué autant que le produit : découper avant de coder, relire et corriger l'IA à voix haute,
tester les cas interdits, savoir expliquer chaque choix (la page `/about` sert d'antisèche).

## S'entraîner

`subjects/` : cloner (`git clone vibe-starter essai-1`), chrono 40 min, ne pas regarder de solution. Changer de sujet entre deux essais.
Après chaque essai, ajouter à `AGENTS.md` ou à `workflow-screens` ce qui a manqué ou ce que l'agent a raté deux fois.
