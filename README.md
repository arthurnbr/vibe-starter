# vibe-starter

Repo de départ pour une épreuve de **vibe coding chronométrée** (≈40 min, app web full stack, IA autorisée).

Parti pris : **le sujet décrit des données ; le candidat doit livrer un outil.** Un agent récent livre le cahier
des charges d'un CRUD en une douzaine de minutes. Ce qui distingue en démo, ce n'est ni le nombre d'écrans ni le
vernis (palette, thème sombre) : ce sont des écrans **en forme de tâche** qui font gagner du temps ou évitent une
erreur à l'utilisateur, sur des données cohérentes. Le repo est réglé pour ça.

## Ce qu'on a appris (7 essais, 4 sujets)

| Essai | Config | Temps | Résultat | Critique |
|---|---|---|---|---|
| foodmart-bi (référence d'Arthur) | omp + Opus, sans starter, « bluffe-moi » | — | 6 vues analytiques, carte, drill-down, vues enregistrées, visite guidée. | Effet wow par le volume ; sujet de BI, donc lecture seule. |
| Run 1 | starter sobre + skills « minimalistes » (ponytail, karpathy) | 9 min 30 | Cahier des charges + bonus, code propre. | **3 pages basiques**, rien qu'on ne ferait pas à la main. |
| Run 2 | shell riche + skill `wow-features` | 14 min 30 | + prévision de rupture, réassort, KPI avec variation, journal, courbe 90 j, Ctrl K. | Propre, mais **les écrans restent des listes + un formulaire avec les champs de la table** : un carnet de notes enrichi, des features « pour faire wow ». |
| Run 3 | `kickoff` = journée de l'utilisateur → workflows ; skill `workflow-screens` ; écran de saisie multi-lignes de référence | 13 min 30 | Accueil « À traiter », réassort → réception pré-remplie de 11 lignes en une transaction, saisie du soir multi-lignes, inventaire attendu / compté. | Les écrans suivent le métier, mais **digitalisent le processus actuel** ; trop de raccourcis clavier une touche ; look shadcn gris par défaut. |
| Run 4 (**nouveau sujet : Fournil**, boulangerie) | `kickoff` = « réinventer, pas digitaliser » (avant → après) ; skill `art-direction` + polices hors ligne ; raccourcis supprimés sauf Ctrl K ; patterns de vues du domaine | 10 min 40 | **Identité** : ticket kraft, Fraunces + DM Sans + mono, croûte dorée / farine / framboise. **Journée** = frise des créneaux avec charge (17 h complet en rouge) + colonnes à préparer → prête → retirée, non-retirés à rappeler en tête. **Commande** : téléphone → client reconnu, « reprendre sa dernière commande » ; créneaux passés/complets désactivés, produits grisés avec « possible dès mar. 16 h » ; acompte suggéré. **Fournée** du jour calculée, triée par premier retrait, imprimable. Ticket imprimable. | L'app **change la façon de faire** (l'app refuse avant le client, calcule la production, lisse les retraits). Reste : page client publique rejetée « hors délai » alors qu'il restait 29 min → règle « use the time » ajoutée. |
| Run 5 (**nouveau sujet : Rayon**, atelier vélo) — protocole post-critique : arrêt après SPEC, calendrier unique, script de preuves | candidat (moi) au point d'arrêt : priorité « dépôt à date tenable + suivi client », règle « attente de pièce libère la capacité », alerte « promesses en danger » | 15 min 20 (arrêt de 1 min inclus) | **Dépôt** : téléphone → client reconnu avec historique, prix et durée en direct, **jauges de charge sur 12 jours** (2 mécaniciens × 7 h), première date tenable proposée, jours pleins barrés et refusés par le serveur. **Ticket** étiquette kraft avec QR. **Atelier** en colonnes par statut, badges « en retard » / « jour surchargé », « Replanifier » au premier jour libre, « Pièce reçue » qui revérifie et décale la promesse. **SMS prêt** pré-rédigé. **Page client publique** `/suivi/<code>` mobile. 18 invariants PASS, verify vert, aucun serveur laissé. | **Jury sans contexte : 15/20, « embaucher »** (« la promesse de date est une vraie règle, pas une aide visuelle »). Défauts : client renommé en silence, « pièce reçue » qui garde une date pleine faute d'alternative, QR vers `localhost`, recherche impossible par n° de ticket, réparation non modifiable après dépôt, retards ignorés par la charge, script de preuves partiel. **Transformés en règles génériques** (data-integrity, workflow-screens §7). |
| Run 6 (**nouveau sujet : Outilthèque**, location d'outils) — starter avec tous les correctifs (audit de clics e2e, tests par l'IP réseau, `newRequestId`) | candidat (moi) au point d'arrêt : priorité « comptoir du jour », jour de fin occupé, retour anticipé qui libère, retard signalé non facturé | ≈ 52 min d'agent (SPEC 3 min, code 30 min, preuves + e2e 19 min), **sans aucune retouche** | **Comptoir du jour** (départs / retours / retards ; caution encaissée, rendue ou retenue avec motif obligatoire ; conflit « le Kärcher en retard est attendu demain par Mme Diallo »). **Disponibilité par jour, retards compris** : une seule règle partout (formulaire, serveur, planning, preuves) ; modèle complet barré avec « Décaler au … » ou alternative. Planning 14 jours en panneau perforé, coffre des cautions, catalogue avec garde-fous, contrat imprimable, « à prévenir la veille ». 50 invariants PASS, **e2e 34/34**. | **Jury sans contexte : 16/20, « embaucher »**. Défauts : prolonger une location recalcule le total, donc « encaissé » et le contrat gonflent sans encaissement ; recherche aveugle aux accents (« Émilie ») ; occupation qui compte les réservations comme sorties ; doublon de modèle par la casse ; « 12,5 » refusé avec un message anglais ; bouton désactivé sans raison ; aperçu de retenue négative. **Transformés en helpers et règles** (`searchKey`, `frenchNumber`, zod français, data-integrity, workflow-screens §6). |

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
5. **Le prompt du candidat reste court** : la méthode est dans `AGENTS.md` et les skills.
6. **L'agent sous-estime le temps disponible** et coupe « par prudence » (runs 3 et 4). Mais la critique externe a
   montré l'excès inverse : interdire de renoncer retire au candidat un arbitrage attendu. Solution retenue : un
   calendrier unique avec une fenêtre d'extension (22–28) conditionnée à « tout le sujet marche », puis un gel.
7. **Digitaliser ≠ réinventer.** Le saut du run 4 vient de la question « que peut décider l'app à la place de
   l'utilisateur, que sait-elle qu'il ne voit pas ? » et de vues du domaine (créneaux, étapes, production) au lieu de tables.
8. **La personnalité se décide en 5 min, une fois** : 3 mots d'ambiance, un objet de référence du métier, un élément
   signature, une paire de polices. Ensuite chaque écran en hérite.
9. **Le point d'arrêt après le SPEC ne coûte rien et change la donne** (run 5) : 1 min 15 d'arrêt, et la décision du
   candidat (« l'attente de pièce libère la capacité ») est devenue la meilleure fonctionnalité selon le jury.
   C'est aussi ce qui rend la démo défendable : le candidat a pris une vraie décision métier, visible dans l'app.
10. **Le plafond de qualité est maintenant la complétude du jour 2**, plus les idées : ce qui manque est ce qu'un
   utilisateur rencontre le lendemain (modifier, annuler, chercher ce qui est imprimé, écrans partagés à jour).
   Ces points sont dans `workflow-screens` §7 et dans `data-integrity`.
11. **« Ça marche chez l'agent » ne suffit pas : il faut un contrôle navigateur automatique.** Sur Rayon, les 6 barres
   du graphique de l'accueil menaient toutes au même endroit (le gestionnaire lisait « l'élément survolé » au lieu de
   la barre cliquée). Ni l'agent, ni le jury, ni moi ne l'avions vu. `npm run e2e` clique désormais chaque élément de
   chaque page sans survol préalable et échoue sur tout clic mort ou mal routé ; sur Rayon il a retrouvé ce bug et
   un second (« Copier le SMS » de l'atelier ne fait rien hors HTTPS : pas de solution de secours, contrairement à la fiche).
12. **Tester depuis l'adresse où l'utilisateur ouvrira l'app, pas depuis `localhost`.** Rayon corrigé passait tous ses
   tests en local, mais ouvert par Tailscale **aucun bouton ni graphique ne réagissait** : `next dev` bloque ses
   scripts pour toute origine autre que `localhost`. Corrigé dans `next.config.ts` (`allowedDevOrigins` = IPs de la
   machine), et la démo se fait désormais sur `npm run demo` (build de production), vérifiée depuis l'IP réseau.
13. **Le starter complet tient sans retouche, mais pas dans les 40 minutes** (run 6, 16/20). L'agent a écrit ses
   parcours e2e, l'audit de clics a trouvé seul deux clics morts, le script d'invariants a trouvé seul un bug de
   disponibilité. Coût : ≈ 52 min, dont ≈ 20 de preuves : l'e2e complet dure ≈ 5 min sur une app de cette taille
   (l'audit clique chaque élément), et l'agent l'a relancé en entier après chaque correction. D'où la règle :
   relancer **seulement le test rouge** (`-g`), l'e2e complet une fois au gel. Les défauts restants sont des oublis
   « jour 2 » d'un logiciel français (accents, virgule décimale, messages en anglais) et un piège d'argent (modifier
   une location payée réécrit l'encaissé) : ils sont maintenant des helpers (`src/lib/text.ts`, `src/lib/zod.ts`) et
   des règles. **Le jour J, le candidat doit tenir le calendrier**, quitte à arrêter la phase 2.

## Critique externe (agents sans contexte, sur Fournil et sur ce starter)

Trois revues indépendantes, faites par des agents qui ne connaissaient ni nos échanges ni nos intentions.

| Revue | Verdict | Points clés |
|---|---|---|
| Jury produit (Fournil, testé dans un navigateur + appels serveur directs) | **Embaucher avec réserves, 15/20** | Pense métier avant écran ; règles tenues côté serveur. Mais : « Annuler » du toast ne restaure pas une commande prête ; double envoi crée 2 commandes ; alerte qui confond « pas prêt » et « pas retiré » ; KPI dont le lien inclut les annulées ; date invalide → 500 ; recherche sensible aux accents ; affirmations de `DEMO.md` calées sur une heure précise. |
| Revue de code (Fournil) | Code 13/20, données 11/20 | Capacité contournable avec un créneau à 17:00:01 ; réactivation sans re-vérifier la capacité ; seed qui viole les délais et crée de l'historique futur ; codes tirés de `Date.now()` ; fuseau horaire implicite. |
| Revue du starter | 6/10 pour un entretien piloté par le candidat | **Le candidat devient passager** (autonomie totale, aucune décision) ; risque si le code préparé est interdit ; trois calendriers contradictoires ; `demo-ready` vérifiait avant de modifier ; exemples de référence bogués (lot modifiable pendant l'envoi, filtres qui s'écrasent, mise à jour fantôme, `?new` non réarmable, KPI/lien incohérents) ; YAML de `demo-ready` invalide ; Node ≥ 20 faux. |

Corrigé dans le starter :
- **Candidat décisionnaire** : arrêt unique après `SPEC.md` (résumé en 6 lignes, le candidat choisit), précontrôle
  « ce starter est-il autorisé ? », trace des corrections demandées à l'IA.
- **Un seul calendrier** (AGENTS.md = README), gel à 28 min, renoncer à un bonus est légitime.
- **`demo-ready`** : exemple retiré dès la minute 5–8, redémarrage après reset, `npm run verify` en tout dernier.
- **Preuves rejouables** : `npm run invariants` (script modèle `scripts/check-invariants.ts`), exigé pour toute
  affirmation « refusé » de `DEMO.md`.
- **`data-integrity`** liste les pièges trouvés par les revues : créneau canonique, capacité re-vérifiée à chaque
  transition, undo = état exact, double envoi (verrou synchrone + `requestId` unique), fuseau métier unique, codes
  séquentiels, dates calendaires validées, normalisation téléphone/accents, statuts distincts dans KPI et alertes.
- **Code de référence corrigé et vérifié dans le navigateur** : lot verrouillé pendant l'envoi + garde contre le
  double clic, erreurs rattachées à la ligne même après suppression, limite de 50 lignes affichée ; filtres qui
  fusionnent recherche en attente et statut ; mise à jour d'une ligne disparue = erreur ; `?new` réarmable ;
  KPI et lien partagent le même filtre ; contraintes SQL `CHECK` sur les enums.
- YAML valide, Node 22 (`.nvmrc`, `engines`), `/about` sans affirmation fausse, règles subjectives rendues conditionnelles.

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
| `demo-ready` | Gel à la minute 28 : redémarrage après reset, parcours de chaque ligne du sujet, `/about` et `DEMO.md` vrais, `npm run verify` en dernier. |
| `shadcn` | Skill officiel shadcn (`npx skills add shadcn/ui`). |

## Avant tout : ce starter est-il autorisé ?

Demander au recruteur, avant l'épreuve :
- Peut-on arriver avec du code préparé (starter, composants) ? Avec des instructions préparées pour l'agent ?
- La stack est-elle libre ? Le réseau et l'agent de son choix sont-ils autorisés ? L'installation compte-t-elle dans les 40 min ?

Si le code préparé est interdit : garder seulement la **méthode** (kickoff, data-integrity, calendrier) en tête, et
dire en ouverture d'épreuve ce qui était préparé. Dans tous les cas, savoir distinguer à l'oral ce qui vient du
starter (shell, palette, thème) de ce qui a été construit pendant l'épreuve.

## Reproduire chez soi

Prérequis : **Node.js 22** (`.nvmrc`, `engines`; `better-sqlite3` 13 l'exige), npm, git,
Codex CLI (`npm i -g @openai/codex`) ou un autre agent qui lit `AGENTS.md` et `.agents/skills`.

```bash
git clone <ce-repo> mon-epreuve && cd mon-epreuve
npm ci                # versions verrouillées : le seul chemin reproductible
npm run db:reset      # crée data/app.db et injecte les données de démo
npm run verify        # typecheck + lint + build de production
npm run invariants    # script de preuve : chaque cas interdit → PASS/FAIL
npm run e2e           # Playwright : pages, audit de clics, parcours (~1 min)
npm run dev           # http://localhost:3000 (ou l'IP de la machine depuis un autre appareil) — tester Ctrl K et le thème
npm run demo          # la version de démo : reset + build de production + serveur sur toutes les interfaces
codex                 # /skills doit lister kickoff, art-direction, workflow-screens…
```

Vérification dans le navigateur : l'agent en a besoin pour la définition de « terminé ». Si votre agent ne pilote
pas de navigateur, c'est au candidat de faire les parcours à la main (c'est d'ailleurs un bon moment à montrer).

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
npm i drizzle-orm better-sqlite3 zod es-toolkit date-fns server-only motion geist \
  @fontsource-variable/{bricolage-grotesque,fraunces,space-grotesk,instrument-sans,manrope,dm-sans,jetbrains-mono}
npm i -D drizzle-kit @types/better-sqlite3 tsx
npx skills add shadcn/ui -a codex -y --copy
# puis copier depuis ce repo : AGENTS.md, .agents/skills/*, scripts/, src/, drizzle.config.ts, .nvmrc,
# next.config.ts (dont le loader @tailwindcss/turbopack), eslint.config.mjs et les scripts de package.json
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
| `npm run verify` | check + build : la porte finale |
| `npm run invariants` | `scripts/check-invariants.ts` : tente chaque cas interdit sur une copie de la base |
| `npm run e2e` | Playwright sur une base réinitialisée et un build de prod : chaque page se charge sans erreur, **chaque élément cliquable de chaque page fait quelque chose** (clic réel, sans survol ; aucun clic mort ni plusieurs barres d'un graphique vers la même cible), chaque parcours métier passe avec un cas refusé. Navigateur : `npx playwright install chromium` une fois. |
| `npm run demo` | reset + build de production + `next start` sur toutes les interfaces (port 3000) : ce qu'on montre au jury. |

**Après un `db:reset`, redémarrer le serveur** : `db:reset` supprime le fichier que le serveur garde ouvert, qui
afficherait sinon une base orpheline.

## Le jour J

Prompt de départ :

```text
Épreuve chronométrée : 40 minutes. Construis l'app décrite ci-dessous dans ce repo, en suivant AGENTS.md et les
skills de .agents/skills. Après SPEC.md, attends mon go ; ensuite travaille en autonomie.
<coller le sujet>
```

Calendrier unique (identique à `AGENTS.md`) :

| Minutes | Candidat | Agent |
|---|---|---|
| 0–5 | Lit le sujet à voix haute, annonce la méthode (« je pars de la journée de l'utilisateur, pas des tables »). Lit le résumé du SPEC, **choisit** le workflow prioritaire, l'invariant critique et ce qui est reporté, donne le go. | `kickoff` → `SPEC.md` + résumé en 6 lignes, puis attend. |
| 5–8 | Commente la direction artistique choisie. | `art-direction`, suppression de l'exemple `tasks`. |
| 8–22 | Ouvre l'app après chaque commit, verbalise ce qu'il vérifie, relit les diffs sensibles (transactions, contrôles), interrompt si l'agent boucle. | Workflows qui couvrent le sujet. |
| 22–28 | Décide : extension de la phase 2 **ou** corrections. Renoncer à un bonus est une décision légitime, à dire. | Extension ou corrections. |
| 28–32 | Gel. Lance `npm run invariants` et `npm run e2e` devant l'examinateur, essaie de casser l'app. | `demo-ready`. |
| 32–40 | Démo avec `DEMO.md` et `/about`. | Inactif. |

Garder une trace des corrections réellement demandées à l'IA pendant l'épreuve (deux ou trois exemples précis) :
c'est la meilleure réponse à « usage critique de l'IA ».

## S'entraîner

`subjects/` : cloner (`git clone vibe-starter essai-1`), chrono 40 min, ne pas regarder de solution. Changer de sujet entre deux essais.
Après chaque essai, ajouter à `AGENTS.md` ou à `workflow-screens` ce qui a manqué ou ce que l'agent a raté deux fois.
