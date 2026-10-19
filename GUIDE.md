# Épreuve de vibe coding en 40 minutes : ce qu'on a appris

Ce document résume 8 essais sur 5 sujets différents, chacun jugé par un « jury » indépendant (un agent IA sans
contexte, chargé de casser l'app comme le ferait un recruteur exigeant). Il donne la méthode, les réglages et les
pièges à connaître avant le jour J. Le repo `vibe-starter` contient tout ce qui est décrit ici.

---

## 1. Le résultat en une page

| Essai | Configuration | Temps | Note du jury |
|---|---|---|---|
| Run 1 | starter sobre + skills « minimalistes » (ponytail, karpathy) | 9 min 30 | 3 pages basiques |
| Run 2 | shell riche + skill « fonctionnalités wow » | 14 min 30 | joli, mais des listes + formulaires |
| Run 3 | méthode « journée de l'utilisateur » | 13 min 30 | écrans métier, mais qui recopient le papier |
| Run 4 | « réinventer, pas digitaliser » + direction artistique | 10 min 40 | 15/20 (Fournil, boulangerie) |
| Run 5 | point d'arrêt candidat après le SPEC + script de preuves | 15 min 20 | **15/20, embaucher** (Rayon, atelier vélo) |
| Run 6 | + tests navigateur automatiques | 52 min ⚠️ | **16/20, embaucher** (location d'outils) |
| Run 7 | **Codex + GPT-6**, calendrier serré | **32 min** ✅ | **16/20, embaucher** (cantine) |

**Conclusion** : avec le starter, Codex + GPT-6 produit seul, dans les 40 minutes, une app que le jury juge
« embauchable », pour environ 5 $ de tokens. Le rôle du candidat n'est pas de coder : c'est de **prendre deux ou
trois décisions métier**, de **tenir le chrono** et de **savoir défendre l'app** en démo.

---

## 2. Ce que l'épreuve évalue vraiment

Un agent récent écrit le CRUD d'un cahier des charges en une douzaine de minutes. Tous les candidats l'auront.
Ce qui fait la différence :

1. **Des écrans en forme de tâche, pas en forme de table.** Le jury ne retient pas « une liste des réservations
   + un bouton Nouveau ». Il retient « la cuisine voit combien cuisiner, l'app refuse le plat complet ».
2. **Des données qui ne mentent jamais.** Surréservation, double clic, deux onglets en même temps, date absurde :
   le jury essaie tout. Ce qui tient côté serveur rapporte des points, ce qui ne tient que dans l'interface en fait perdre.
3. **Une démo qui raconte la nouvelle journée de l'utilisateur**, pas une visite des menus.
4. **L'usage critique de l'IA** : savoir dire ce qu'on a vérifié, refusé ou corrigé dans ce que l'agent a produit.

---

## 3. La méthode, en 6 idées

### 3.1 Partir de la journée de l'utilisateur, pas des données
Avant toute fonctionnalité, l'agent écrit la journée actuelle de l'utilisateur : à quel moment, avec quoi en main,
qu'est-ce qui est pénible. Sans ça, même avec beaucoup de fonctionnalités, on obtient un carnet de notes
(runs 1 et 2).

### 3.2 Réinventer, ne pas digitaliser
La question qui a fait le saut de qualité (run 4) : **« Que peut décider l'app à la place de l'utilisateur ? Que
sait-elle qu'il ne voit pas ? »**
- Boulangerie : l'app calcule la fournée du lendemain et refuse les créneaux pleins.
- Atelier vélo : l'app propose la première date de retrait tenable selon la charge des mécaniciens.
- Cantine : l'app calcule « à cuisiner = réservés + marge » au lieu de « portions prévues ».

On l'écrit en lignes **avant → après**.

### 3.3 Le candidat décide, une fois, au bon moment
Après le `SPEC.md`, l'agent s'arrête et résume en 6 lignes. Le candidat choisit :
- le **parcours prioritaire** ;
- la **règle critique** (celle qu'on ne doit jamais pouvoir violer) ;
- ce qui est **reporté**.

Cet arrêt coûte 1 à 2 minutes. Sur Rayon, la décision du candidat (« attendre une pièce libère la capacité ») est
devenue la meilleure fonctionnalité selon le jury. Sur la cantine, la marge de cuisine a été jugée « bien pensée ».
C'est aussi ce qui rend la démo défendable : **une vraie décision métier, visible dans l'app, prise par le candidat**.

### 3.4 Une identité visuelle décidée en 5 minutes
Trois mots d'ambiance, un objet de référence du métier (ticket kraft, ardoise, panneau d'outils), un élément
signature répété partout, une paire de polices. Pas de raccourcis clavier à une touche (invisibles en démo, gênants
à la saisie) : seulement Ctrl K.

### 3.5 Les règles dures plutôt que la sobriété
Les skills de « code minimal » (ponytail, karpathy) brident un projet neuf de 40 minutes : run 1 = 3 pages.
La propreté vient de règles dures que l'agent suit à chaque écriture : validation côté serveur, une transaction par
geste métier, contraintes SQL en double. Elles ont tenu sur tous les runs.

### 3.6 Prouver, pas affirmer
Deux preuves rejouables, lancées devant l'examinateur :
- `npm run invariants` : tente chaque cas interdit avec le vrai code d'écriture (surréservation, double envoi,
  heure limite…) et affiche PASS/FAIL ;
- `npm run e2e` : ouvre chaque page dans un vrai navigateur, **clique chaque élément** et échoue sur tout clic qui
  ne fait rien ou qui mène au mauvais endroit, puis déroule chaque parcours métier.

L'audit de clics a trouvé des bugs que ni l'agent, ni le jury, ni nous n'avions vus (6 barres d'un graphique qui
menaient toutes à la même page).

---

## 4. Le calendrier du jour J

| Minutes | Le candidat | L'agent |
|---|---|---|
| 0–2 | Lit le sujet à voix haute, annonce la méthode : « je pars de la journée de l'utilisateur ». Colle le prompt. | `kickoff` → `SPEC.md` + résumé en 6 lignes, puis attend. |
| 2–5 | Lit le résumé, **décide** (parcours prioritaire, règle critique, reporté, une idée métier), donne le go. | Attend. |
| 5–8 | Commente la direction artistique. | Identité visuelle, suppression de l'exemple du starter. |
| 8–22 | Ouvre l'app après chaque commit, dit à voix haute ce qu'il vérifie, relit les parties sensibles (transactions, contrôles), interrompt si l'agent tourne en rond. | Parcours du cahier des charges, une tranche = un commit, un test ciblé par tranche. |
| 22–28 | Décide : un bonus **ou** des corrections. Renoncer à un bonus est une décision, à dire. | Bonus ou corrections. |
| 28–32 | **Gel.** Lance les preuves devant l'examinateur, essaie de casser l'app lui-même. | Invariants, **un seul** e2e complet en tâche de fond, `/about` et `DEMO.md`, verify, commit. |
| 32–40 | Démo avec `DEMO.md` et `/about`. | Inactif. |

Le prompt de départ, à coller tel quel :

```text
Épreuve chronométrée : 40 minutes. Construis l'app décrite ci-dessous dans ce repo, en suivant AGENTS.md et les
skills de .agents/skills. Après SPEC.md, attends mon go ; ensuite travaille en autonomie.
<coller le sujet>
```

Exemple de go, tiré du run 7 (≈ 1 minute à écrire) :

```text
Go. Parcours prioritaire : le plan de production du jour.
Décision : à la fermeture, l'app calcule à cuisiner = réservés + 5 % de marge (modifiable).
Règle critique : capacité par plat, dans une transaction ; puis la fermeture à 14 h la veille.
Phase 2 : fiche de production, puis allergènes. Liste d'attente abandonnée.
Tiens le calendrier d'AGENTS.md jusqu'au bout.
```

---

## 5. La stack et pourquoi

| Choix | Pourquoi |
|---|---|
| **Next.js 16 (App Router), TypeScript** | Front et back dans un seul process ; c'est la stack que l'agent maîtrise le mieux (OpenAI la recommande pour GPT). |
| **shadcn/ui + Tailwind v4** | Composants professionnels copiés dans le projet (l'agent peut les lire et les modifier) ; 35 déjà ajoutés. |
| **Drizzle + SQLite** | Aucun service à lancer, transactions synchrones, contraintes en base. |
| **zod 4** (en français), recharts via shadcn `chart`, date-fns, es-toolkit | Validation, graphiques, dates, utilitaires : la « technique lourde » déléguée à des bibliothèques. |
| **Playwright** | Les preuves navigateur (`npm run e2e`). |
| Polices embarquées (`@fontsource`) | Aucune dépendance au réseau le jour J. |

Le starter fournit aussi : barre latérale, palette Ctrl K (recherche + actions), thème sombre, toasts, page
`/about` (méthodologie, à remplir à la fin) et une **fonctionnalité de référence** que l'agent recopie, dont un
écran de saisie multi-lignes. L'agent copie les modèles qu'il voit : sans exemple, il retombe sur le formulaire
d'un seul enregistrement.

---

## 6. Les pièges que le jury a trouvés (et que le starter évite maintenant)

Tous ont été vus au moins une fois. Ils sont maintenant des règles dans les skills (`data-integrity`,
`workflow-screens`) ou des helpers dans le starter. Le candidat doit les connaître pour **les vérifier lui-même**.

**Cohérence des données**
- Capacité vérifiée à chaque transition : création, modification, **réactivation**, déplacement.
- Double clic et deux onglets : un verrou côté formulaire + un identifiant de requête unique en base.
- Modifier un enregistrement déjà payé ne doit jamais réécrire l'« encaissé » : on crée un solde à encaisser.
- Un client reconnu par son téléphone mais saisi sous un autre nom : demander, ne jamais renommer en silence.
- Un retard continue d'occuper la capacité ; un statut futur dit « Attendu », pas « Absent ».
- Un seul fuseau horaire métier (Europe/Paris), calculé côté serveur.

**Le « jour 2 » d'un logiciel français**
- La recherche doit ignorer les accents, la casse et les ligatures (« Emilie », « boeuf »).
- Les nombres se saisissent avec une virgule : **jamais de champ `type="number"`** (dans un navigateur anglais,
  « 10,5 » devient 105 sans aucune erreur).
- Tous les messages en français, y compris ceux de la validation.
- On peut modifier, annuler, revenir d'une étape ; on retrouve ce qui est imprimé (le code du ticket).
- Un bouton désactivé dit pourquoi.

**Démo et réseau**
- **Démontrer le build de production** (`npm run demo`), pas le serveur de développement.
- **Tester depuis l'adresse où l'app sera ouverte**, pas `localhost`. Deux bugs réels :
  - le serveur de dev bloquait ses scripts depuis une autre adresse : page visible, **aucun bouton ne réagissait** ;
  - `crypto.randomUUID()` et le presse-papiers n'existent pas en HTTP hors `localhost` : la page plantait.
- Les QR codes et liens SMS utilisent une adresse publique configurée, jamais `localhost`.

**Le temps**
- L'e2e complet dure environ 5 minutes sur une app de cette taille. Le relancer après chaque correction a fait
  durer le run 6 52 minutes. Règle : **un test ciblé par tranche, l'e2e complet une seule fois au gel**.
- À la fin, relancer **seulement** les tests corrigés. Le run 7 a livré 3 corrections jamais relancées.

---

## 7. Conseils pour toi, le jour J

**Avant l'épreuve**
1. **Demander au recruteur** : code préparé autorisé ? Instructions pour l'agent autorisées ? Stack libre ?
   Agent de son choix ? L'installation compte-t-elle dans les 40 minutes ?
   Si le code préparé est interdit : garder la **méthode** en tête et le dire en ouverture.
2. **Faire au moins deux essais chronométrés** avec ton propre compte Codex, sur deux sujets de `subjects/`
   que tu n'as pas lus. Le but : savoir écrire ton go en une minute.
3. Vérifier la machine : Node 22, `npm ci`, `npx playwright install chromium`, `npm run verify`, `npm run e2e`.

**Pendant l'épreuve**
4. **Parle.** Annonce la méthode, dis ce que tu vérifies à chaque commit. Le jury évalue ta façon de penser.
5. **Prends une décision métier visible** au point d'arrêt, et réutilise-la en démo : « J'ai décidé que… parce que… ».
6. **Ouvre l'app après chaque commit** et essaie un cas interdit toi-même (double clic, plat complet, date passée).
7. **Note deux ou trois corrections que tu as demandées à l'IA.** C'est ta meilleure réponse à « usage critique de
   l'IA » : « l'agent avait écrit X, j'ai vu Y, j'ai demandé Z ».
8. **À 28 minutes, gèle.** Une fonctionnalité de plus vaut moins qu'une démo qui marche.

**Pendant la démo**
9. Raconte la **nouvelle journée** de l'utilisateur, en 6 à 8 étapes (`DEMO.md`), avant → après.
10. **Lance les preuves devant l'examinateur** (`npm run invariants`, l'e2e si le temps le permet) et casse l'app
    en direct : un refus serveur vaut mieux qu'un discours.
11. Sépare clairement **ce qui vient du starter** (shell, palette, thème) **de ce qui a été construit pendant
    l'épreuve**. `/about` liste la stack, les choix, les limites et ce que tu as vérifié.

**Ce qu'il ne faut pas faire**
- Ajouter des fonctionnalités « pour faire wow » sans lien avec la journée de l'utilisateur.
- Laisser l'agent seul 20 minutes sans ouvrir l'app.
- Annoncer « c'est testé » sans avoir lancé le test.
- Démontrer sur `localhost` avec le serveur de développement.

---

## 8. Ce que coûte un run (Codex + GPT-6, run 7)

| | |
|---|---|
| Durée | 32 min 25, du prompt au dernier commit |
| Appels au modèle | 166 (une compaction de contexte à 31 min) |
| Tokens en entrée | 17,2 M, dont 97,7 % en cache |
| Tokens en sortie | 63 k, dont 24 k de raisonnement |
| Contexte maximal | 176 k sur 258 k |
| Coût estimé | ≈ 4,80 $ au tarif public de `gpt-6-sol` |
| Code produit | 56 fichiers, +1 905 / −902 lignes, 6 commits |

Le temps se répartit en environ 22 minutes de réflexion du modèle et 8 minutes d'outils (lecture, tests, build).
Le principal levier de vitesse n'est donc pas la machine : c'est **le nombre de fois où l'agent relance des
vérifications longues**, d'où les règles du calendrier.

---

## 9. Pour aller plus loin

- `README.md` du starter : le détail de chaque essai, les critiques externes et les correctifs.
- `AGENTS.md` : le calendrier et les règles que suit l'agent.
- `.agents/skills/` : `kickoff`, `art-direction`, `workflow-screens`, `data-integrity`, `ship-feature`,
  `demo-ready`, `shadcn`.
- `subjects/` : 5 sujets d'entraînement (stock, boulangerie, atelier vélo, location d'outils, cantine).
- Après chaque essai : ajouter à `AGENTS.md` ou aux skills ce que l'agent a raté deux fois.
