# Sujet : « Cantine », réservation des repas d'une cantine d'entreprise

> Contexte. La cantine d'une PME (180 salariés) prépare chaque midi un plat du jour, une option végétarienne et un
> dessert, avec un nombre limité de portions. Aujourd'hui les salariés réservent sur un tableau papier à l'entrée
> la veille, la cuisine compte les croix le matin, et on jette beaucoup. Le responsable veut une app web interne
> pour savoir combien cuisiner, éviter qu'un plat soit réservé au-delà des portions et réduire le gaspillage.
>
> Durée : 40 minutes. L'IA est autorisée. Stack libre. À la fin, vous faites une démo et vous expliquez vos choix.

## Cahier des charges remis au candidat

### Menus
- Un menu est publié pour un jour : une liste de plats (nom, catégorie entrée/plat/dessert, végétarien ou non,
  allergènes, nombre de portions prévues).
- On peut créer, modifier et retirer un plat d'un menu.

### Réservations
- Un salarié (nom, service) réserve un repas pour un jour : un plat et éventuellement un dessert.
- On ne peut pas réserver plus de portions qu'il n'y en a de prévues.
- Les réservations ferment la veille à 14 h ; on peut annuler jusqu'à cette heure.
- On peut rechercher les réservations d'un salarié.

### Service du midi
- Voir les réservations du jour par plat, et pointer les salariés qui se présentent.
- Voir les portions restantes en direct.

### Tableau de bord
- Repas servis de la semaine, taux de présence (venus / réservés), portions jetées estimées.
- Les plats les plus réservés du mois.

### Bonus (si le temps le permet)
- Fiche de production imprimable pour la cuisine.
- Alerter un salarié si un plat contient un de ses allergènes.
- Liste d'attente sur un plat complet.

## Critères d'évaluation
- Une app fonctionnelle de bout en bout.
- La cohérence des données.
- La clarté du code.
- L'usage critique de l'IA.
- La qualité de la démo.
