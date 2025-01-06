# Rapport sur le Projet

## Description

Ce projet est une application web qui affiche une liste de produits. Les utilisateurs peuvent naviguer à travers différentes catégories de produits et voir les détails de chaque produit. L'application permet également d'ajouter des produits au panier et de gérer les commandes.

## Technologies Utilisées

- React
- React Router
- Axios
- Node.js
- Express
- XAMPP (pour la base de données MySQL)

## Prérequis

- Node.js
- npm
- XAMPP (ou tout autre serveur MySQL)

## Installation

1. Clonez le dépôt : `git clone https://github.com/adnaneqassiri/projet_0.2`
2. Installez les dépendances pour le client :
   ```sh
   cd client
   npm install
   ```
3. Installez les dépendances pour le serveur :
   ```sh
   cd ../server
   npm install
   ```
4. Configurez XAMPP et démarrez le serveur MySQL.
5. Créez une base de données MySQL et importez le fichier SQL fourni (par exemple, `database.sql`).
6. Configurez les paramètres de connexion à la base de données dans le fichier `server/config.js`.
7. Lancez le serveur avec `nodemon` :
   ```sh
   cd server
   nodemon index.js
   ```
8. Lancez l'application client :
   ```sh
   cd ../client
   npm start
   ```

## Utilisation

1. Ouvrez votre navigateur et allez à l'adresse [http://localhost:3000](http://localhost:3000)
2. Naviguez à travers les différentes catégories de produits.
3. Cliquez sur un produit pour voir ses détails.
4. Ajoutez des produits au panier et passez des commandes.

## Fonctionnalités

- Affichage de la liste des produits
- Filtrage des produits par catégorie
- Affichage des détails d'un produit
- Ajout de produits au panier
- Gestion des commandes

## Contribuer

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b fonctionnalite/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Poussez votre branche (`git push origin fonctionnalite/AmazingFeature`)
5. Ouvrez une Pull Request

## Auteurs

- Qassiri Adnane - [Votre Profil GitHub](https://github.com/adnaneqassiri)

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
