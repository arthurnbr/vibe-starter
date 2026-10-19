# Épreuve de vibe coding en 40 minutes : ce qu'on a essayé, ce qu'on en retient

Ce document raconte une série d'essais faits pour préparer une épreuve de vibe coding chronométrée (une app web
full stack en 40 minutes, IA autorisée). C'est une méthode parmi d'autres, testée sur nos sujets et nos outils.
Rien ne garantit qu'elle s'applique telle quelle à une autre épreuve : à prendre, adapter ou laisser.

Chaque essai a été jugé par un « jury » : un agent IA sans contexte, à qui on demandait d'utiliser l'app et
d'essayer de la casser comme le ferait un recruteur exigeant. C'est un indicateur utile, pas l'avis d'un vrai
recruteur.

---

## 1. Ce qu'on a fait

On a monté un repo de départ (`vibe-starter`), puis on l'a fait évoluer sur 8 essais et 5 sujets inventés
(gestion de stock, boulangerie, atelier vélo, location d'outils, cantine d'entreprise). Après chaque essai, on a
transformé ce qui avait manqué en règle ou en outil pour l'agent.

| Essai | Ce qu'on testait | Temps | Ce qu'on a observé |
|---|---|---|---|
| Run 1 | starter sobre + skills de « code minimal » (ponytail, karpathy) | 9 min 30 | Cahier des charges couvert, code propre, mais 3 pages basiques. |
| Run 2 | interface riche + skill « fonctionnalités wow » | 14 min 30 | Plus de fonctionnalités, mais toujours des listes et des formulaires. |
| Run 3 | faire écrire d'abord la journée de l'utilisateur | 13 min 30 | Écrans plus proches du métier, mais qui recopient le processus papier. |
| Run 4 | « réinventer, pas digitaliser » + direction artistique | 10 min 40 | L'app commence à décider à la place de l'utilisateur. Jury : 15/20. |
| Run 5 | un point d'arrêt où le candidat décide, + script de preuves | 15 min 20 | Jury : 15/20, « embaucher ». |
| Run 6 | + tests automatiques dans un navigateur | 52 min | Jury : 16/20, mais hors délai. |
| Run 7 | **Codex + GPT-6**, calendrier resserré | 32 min | Jury : 16/20, dans le délai. |

Les runs 1 à 6 ont tourné avec Claude (Opus) dans un autre outil ; seul le run 7 utilise Codex et GPT-6. Dans
tous les cas, je jouais le candidat au point d'arrêt, avec une seule intervention (le « go »).

---

## 2. Ce qu'on en retient

### Sur le produit

**Partir des données mène à un carnet de notes.** Avec un sujet qui décrit des tables, l'agent produit naturellement
des listes et des formulaires, même quand on lui demande « plus de fonctionnalités » (runs 1 et 2). Ce qui a changé
le résultat, c'est de lui faire décrire d'abord la journée de l'utilisateur : à quel moment, avec quoi en main,
qu'est-ce qui est pénible.

**Digitaliser ne suffit pas.** Le saut du run 4 est venu d'une question : « que peut décider l'app à la place de
l'utilisateur, que sait-elle qu'il ne voit pas ? ». Exemples tirés des essais :
- boulangerie : l'app calcule la fournée du lendemain et refuse les créneaux pleins ;
- atelier vélo : l'app propose la première date de retrait tenable selon la charge des mécaniciens ;
- cantine : l'app calcule « à cuisiner = réservés + marge » au lieu de « portions prévues ».

**Les décisions du candidat ont pesé.** Au run 5, on a ajouté un arrêt après le cahier des charges reformulé par
l'agent (`SPEC.md`). L'arrêt a coûté une à deux minutes. Les idées prises à ce moment (« attendre une pièce libère
la capacité » pour l'atelier, la marge de cuisine pour la cantine) sont celles que le jury a le plus remarquées.
Elles ont aussi l'avantage d'être faciles à expliquer en démo, puisque c'est le candidat qui les a choisies.

**Le vernis compte peu.** Palette, thème sombre ou raccourcis clavier n'ont jamais été cités par le jury. Une
identité visuelle simple (une ambiance, un objet de référence du métier, une paire de polices) a suffi à éviter le
look « par défaut ». Les raccourcis à une touche ont plutôt gêné.

### Sur la qualité

**Les skills de « code minimal » freinent un projet neuf.** Ponytail et karpathy sont pensés pour modifier du code
existant sans en rajouter. Sur un projet vide de 40 minutes, ils ont donné une app minimale (run 1). La propreté
est mieux venue de règles strictes : validation côté serveur, une transaction par action métier, contraintes en base.

**L'agent recopie ce qu'il voit.** Une fonctionnalité d'exemple dans le starter (dont un écran de saisie de
plusieurs lignes à la fois) a été reprise presque à chaque fois. Ça marche dans les deux sens : un défaut laissé
dans l'exemple (un champ numérique mal choisi) a été recopié au run 7.

**Le jury trouve surtout des oublis du « deuxième jour ».** Une fois les règles de base en place, les défauts
relevés ont été ceux qu'un utilisateur rencontre après la démo :
- recherche qui ne trouve pas « Émilie » ou « Bœuf » à cause des accents et des ligatures ;
- « 10,5 » enregistré comme 105 dans un navigateur réglé en anglais ;
- messages d'erreur en anglais ;
- modifier une location déjà payée qui change le montant « encaissé » ;
- un jour futur où tout le monde apparaît « Absent ».

Chacun est devenu une règle ou un petit outil dans le starter.

**Les preuves automatiques ont trouvé des bugs que personne n'avait vus.** Un test qui clique chaque élément de
chaque page a révélé que les 6 barres d'un graphique menaient toutes à la même page. Un script qui tente chaque
cas interdit (surréservation, double envoi, heure limite) a trouvé un bug de disponibilité. Mais ces outils ont eu
leurs propres faux positifs, qu'il a fallu corriger (run 7).

### Sur le temps

**Le principal risque est le chrono.** Au run 6, l'app était bonne mais a pris 52 minutes, dont une vingtaine à
relancer les tests complets après chaque correction. Au run 7, en demandant de ne lancer les tests complets
qu'une seule fois à la fin, Codex a tenu en 32 minutes.

**L'agent a tendance à livrer des corrections non revérifiées** quand le temps presse. Au run 7, il a corrigé
3 tests sans les relancer (et il l'a signalé honnêtement).

### Sur la démo

**Deux bugs n'apparaissaient que depuis une autre machine.** Ouverte par une autre adresse que `localhost`, l'app
de développement affichait ses pages mais aucun bouton ne réagissait. Une autre page plantait parce qu'une fonction
du navigateur n'existe qu'en HTTPS. Tous les tests passaient, car ils tournaient en local. Depuis, on fait la démo
sur la version de production et on la vérifie depuis l'adresse réseau.

---

## 3. La méthode qui en est sortie

C'est le déroulé utilisé au run 7. Il a marché sur ce sujet ; il n'a pas été testé dans les conditions d'un vrai
entretien.

| Minutes | Rôle du candidat | Ce que fait l'agent |
|---|---|---|
| 0–2 | Lit le sujet, explique l'approche, lance l'agent. | Écrit `SPEC.md` : journée actuelle, avant → après, parcours, règles, puis s'arrête. |
| 2–5 | Choisit le parcours prioritaire, la règle à ne jamais violer, ce qui est reporté, et une idée métier. | Attend le go. |
| 5–8 | | Identité visuelle. |
| 8–22 | Ouvre l'app après chaque étape, vérifie, intervient si besoin. | Construit les parcours, un test ciblé à chaque étape. |
| 22–28 | Choisit entre un bonus et des corrections. | Bonus ou corrections. |
| 28–32 | Essaie de casser l'app. | Arrêt des nouveautés : preuves, tests complets une fois, page de méthodologie et déroulé de démo. |
| 32–40 | Démo. | — |

Le prompt utilisé au départ :

```text
Épreuve chronométrée : 40 minutes. Construis l'app décrite ci-dessous dans ce repo, en suivant AGENTS.md et les
skills de .agents/skills. Après SPEC.md, attends mon go ; ensuite travaille en autonomie.
<le sujet>
```

Le go donné au run 7, à titre d'exemple :

```text
Go. Parcours prioritaire : le plan de production du jour.
Décision : à la fermeture, l'app calcule à cuisiner = réservés + 5 % de marge (modifiable).
Règle critique : capacité par plat, dans une transaction ; puis la fermeture à 14 h la veille.
Phase 2 : fiche de production, puis allergènes. Liste d'attente abandonnée.
Tiens le calendrier d'AGENTS.md jusqu'au bout.
```

---

## 4. La stack retenue

| Choix | Raison |
|---|---|
| Next.js 16 (App Router), TypeScript | Front et back dans un seul projet ; stack que les agents maîtrisent bien (OpenAI la cite pour GPT). |
| shadcn/ui + Tailwind v4 | Composants propres, copiés dans le projet, que l'agent peut lire et modifier. |
| Drizzle + SQLite | Aucun service à lancer, transactions simples, contraintes en base. |
| zod, recharts (via shadcn), date-fns, es-toolkit | Validation, graphiques, dates, utilitaires : la technique lourde confiée à des bibliothèques. |
| Playwright | Les tests dans un vrai navigateur. |

Le starter ajoute une coque d'application (barre latérale, recherche Ctrl K, thème sombre, notifications), une
fonctionnalité d'exemple, des instructions pour l'agent (`AGENTS.md`) et des skills (`kickoff`, `art-direction`,
`workflow-screens`, `data-integrity`, `ship-feature`, `demo-ready`).

---

## 5. Ce que coûte un essai (run 7, Codex + GPT-6)

| | |
|---|---|
| Durée | 32 min 25 |
| Appels au modèle | 166 |
| Tokens en entrée | 17,2 M, dont 97,7 % en cache |
| Tokens en sortie | 63 k, dont 24 k de raisonnement |
| Coût estimé | ≈ 4,80 $ au tarif public de `gpt-6-sol` |
| Code produit | 56 fichiers, environ 1 900 lignes ajoutées |

Environ 22 minutes de réflexion du modèle pour 8 minutes d'exécution d'outils : la durée dépend surtout du nombre
de vérifications longues que l'agent relance.

---

## 6. Les limites de tout ça

- **Un seul essai avec Codex + GPT-6.** Le résultat peut varier d'un essai à l'autre, et selon le sujet.
- **Le jury est une IA**, pas un recruteur. Il est exigeant sur les données et les bugs, moins sur la présentation
  orale ou la façon de travailler du candidat.
- **Le candidat, c'était moi**, avec le contexte de tous les essais précédents. Quelqu'un qui découvre la méthode
  mettra sans doute plus de temps au point d'arrêt.
- **Un starter préparé n'est pas forcément autorisé.** Selon l'épreuve, seule la méthode resterait utilisable.
- **L'épreuve réelle peut être différente** : autre format, autres attentes, interaction avec l'examinateur.

Le repo complet (starter, sujets d'entraînement, détail de chaque essai dans le `README.md`) est ici, si ça peut
servir : https://github.com/arthurnbr/vibe-starter
