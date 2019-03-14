1 - Cloner un dépôt distant
$ git clone https://github.com/tkaing/node-app.git

2 - Installer les dépendances Node.js
$ cd node-app/
$ npm install

3 - Exécuter et Déployer sur Heroku
$ heroku login
$ heroku create
$ git push heroku master
$ heroku open