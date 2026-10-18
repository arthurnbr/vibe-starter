# Sujet : « Fournil », commandes d'une boulangerie de quartier

> Contexte. Une boulangerie artisanale prend les commandes de ses clients (gâteaux d'anniversaire, plateaux de
> viennoiseries pour des réunions, pains spéciaux) par téléphone et au comptoir, notées dans un cahier. Le
> boulanger veut une app web interne pour ne plus perdre de commandes, savoir quoi produire, et que les retraits
> se passent bien.
>
> Durée : 40 minutes. L'IA est autorisée. Stack libre. À la fin, vous faites une démo et vous expliquez vos choix.

## Cahier des charges remis au candidat

### Catalogue
- Un produit a un nom, une catégorie (pain, viennoiserie, pâtisserie, traiteur), un prix unitaire, et un délai de
  commande minimum en heures (ex. 48 h pour un gâteau personnalisé).
- On peut créer, modifier et désactiver un produit.

### Commandes
- Une commande a un client (nom, téléphone), une date et une heure de retrait, une ou plusieurs lignes
  (produit, quantité), une note libre (ex. « inscription Joyeux anniversaire Léa ») et un statut
  (à préparer, prête, retirée, annulée).
- On ne peut pas commander un produit en dessous de son délai minimum.
- Le total de la commande est calculé automatiquement.
- On peut rechercher une commande par nom ou téléphone du client.

### Journée
- Voir les commandes à retirer aujourd'hui et demain.
- Marquer une commande comme prête puis retirée.

### Tableau de bord
- Chiffre d'affaires des commandes de la semaine, nombre de commandes, panier moyen.
- Les produits les plus commandés du mois.

### Bonus (si le temps le permet)
- Impression d'un ticket de commande.
- Rappel des commandes non retirées.
- Acompte à la commande.

## Critères d'évaluation
- Une app fonctionnelle de bout en bout.
- La cohérence des données.
- La clarté du code.
- L'usage critique de l'IA.
- La qualité de la démo.
