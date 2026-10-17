# Sujet : « Stockly », gestion de stock d'une petite boutique

> Contexte. Une boutique de matériel de randonnée gère son stock dans un tableur. Le gérant veut une app web interne pour savoir à tout moment ce qu'il a en rayon, ce qui arrive bientôt en rupture, et garder l'historique des mouvements.
>
> Durée : 40 minutes. L'IA est autorisée. Stack libre. À la fin, vous faites une démo et vous expliquez vos choix.

## Cahier des charges remis au candidat

### Produits
- Un produit a un nom, une référence (SKU) unique, une catégorie, un prix de vente, une quantité en stock et un seuil d'alerte.
- On peut créer, modifier et archiver un produit.
- La liste des produits permet de chercher par nom ou SKU, de filtrer par catégorie et par « en alerte », et de trier par stock.

### Mouvements de stock
- On enregistre une entrée (livraison fournisseur) ou une sortie (vente, casse), avec une quantité, un motif et une date.
- Le stock d'un produit est mis à jour à chaque mouvement.
- Le stock ne peut jamais devenir négatif.
- La fiche produit affiche l'historique de ses mouvements.

### Tableau de bord
- Nombre de produits, valeur totale du stock, nombre de produits en alerte.
- Un graphique des entrées et des sorties sur les 30 derniers jours.
- La liste des 5 produits les plus vendus du mois.

### Bonus (si le temps le permet)
- Export CSV de l'inventaire.
- Mise en avant visuelle des produits sous le seuil.
- Annulation d'un mouvement.

## Critères d'évaluation
- Une app fonctionnelle de bout en bout.
- La cohérence des données.
- La clarté du code.
- L'usage critique de l'IA.
- La qualité de la démo.
