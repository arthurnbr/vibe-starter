# Sujet : « Rayon », atelier de réparation de vélos

> Contexte. Un atelier de réparation de vélos (2 mécaniciens) prend les vélos en dépôt au comptoir ou sur
> rendez-vous. Aujourd'hui tout passe par des étiquettes papier accrochées au guidon et un agenda papier. Le gérant
> veut une app web interne pour savoir où en est chaque vélo, ne plus promettre des délais impossibles, et que les
> clients arrêtent d'appeler pour savoir si leur vélo est prêt.
>
> Durée : 40 minutes. L'IA est autorisée. Stack libre. À la fin, vous faites une démo et vous expliquez vos choix.

## Cahier des charges remis au candidat

### Prestations
- Une prestation a un nom (révision, changement de chambre à air, réglage freins…), un prix et une durée estimée
  en minutes.
- On peut créer, modifier et désactiver une prestation.

### Réparations
- Une réparation a un client (nom, téléphone), un vélo (description libre, ex. « VTT Rockrider bleu »), une ou
  plusieurs prestations, une date de dépôt, une date de retrait promise et un statut
  (déposé, en cours, en attente de pièce, prêt, rendu).
- Le prix total et la durée totale sont calculés à partir des prestations.
- On peut ajouter une note à une réparation (ex. « pneu arrière usé, à proposer au client »).
- On peut rechercher une réparation par nom ou téléphone du client.

### Atelier
- Voir les réparations en cours par statut.
- Faire avancer une réparation d'un statut à l'autre.

### Tableau de bord
- Chiffre d'affaires des réparations rendues de la semaine, nombre de réparations, délai moyen entre dépôt et retrait.
- Les prestations les plus demandées du mois.

### Bonus (si le temps le permet)
- Ticket de dépôt imprimable à accrocher au vélo.
- Prévenir le client quand son vélo est prêt.
- Historique des réparations d'un même client.

## Critères d'évaluation
- Une app fonctionnelle de bout en bout.
- La cohérence des données.
- La clarté du code.
- L'usage critique de l'IA.
- La qualité de la démo.
