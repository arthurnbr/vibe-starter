# Sujet : « Outilthèque », location de matériel de bricolage

> Contexte. Une petite boutique de quartier loue du matériel de bricolage et de jardinage (perceuses, ponceuses,
> échafaudages, nettoyeurs haute pression…) à la journée. Chaque modèle existe en un ou plusieurs exemplaires.
> Aujourd'hui les réservations sont notées dans un cahier et les cautions sur des post-it. Le gérant veut une app
> web interne pour ne plus louer un outil qui n'est pas là, savoir ce qui doit rentrer aujourd'hui et ne plus
> oublier de rendre une caution.
>
> Durée : 40 minutes. L'IA est autorisée. Stack libre. À la fin, vous faites une démo et vous expliquez vos choix.

## Cahier des charges remis au candidat

### Catalogue
- Un modèle d'outil a un nom, une catégorie, un prix par jour, un montant de caution et un nombre d'exemplaires.
- On peut créer, modifier et retirer un modèle du catalogue.

### Locations
- Une location a un client (nom, téléphone), un ou plusieurs outils (modèle et quantité), une date de début et une
  date de fin, et un statut (réservée, en cours, rendue, annulée).
- Le prix total est calculé à partir des outils et du nombre de jours.
- On ne peut pas louer plus d'exemplaires d'un modèle qu'il n'y en a de disponibles sur la période.
- La caution est encaissée au départ et rendue au retour ; on peut en retenir une partie avec un motif (outil abîmé).
- On peut rechercher une location par nom ou téléphone du client.

### Comptoir
- Voir les départs et les retours du jour, et les locations en retard.
- Faire passer une location au statut suivant (départ, retour).

### Tableau de bord
- Chiffre d'affaires de la semaine, taux d'occupation du parc, nombre de locations en retard.
- Les outils les plus loués du mois.

### Bonus (si le temps le permet)
- Contrat de location imprimable à signer au départ.
- Prévenir le client la veille de la date de retour.
- Historique des locations d'un même client.

## Critères d'évaluation
- Une app fonctionnelle de bout en bout.
- La cohérence des données.
- La clarté du code.
- L'usage critique de l'IA.
- La qualité de la démo.
