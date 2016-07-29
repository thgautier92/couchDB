Bravo ! vous venez d'installer le source. 

Cet outil de permet d'accompagner l'apprentissage de la manipulation du format JSON et des bases de données NOSQL.

## Installation 
Les opérations à mener sont les suivantes :

1. Lancer les commandes : 
    1. cd couchDB
    2. npm install

2. Modifier le fichier suivant : 
    couchDB\node_modules\ionic-gulp-scripts-copy

    A la variable defaultSrc, ajouter en fin de tableau, les lignes suivantes : 
    ```
    ,
    'node_modules/json-formatter-js/dist/bundle.js',
    'node_modules/json-formatter-js/js/bundle.js.map'
    'node_modules/chart.js/dist/Chart.bundle.js',
    'node_modules/pouchdb/dist/pouchdb.js'  
    ```
    pour obtenir : 
    ```
    var defaultSrc = [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/json-formatter-js/dist/bundle.js',
    'node_modules/json-formatter-js/dist/bundle.js.map',
    'node_modules/chart.js/dist/Chart.bundle.js',
    'node_modules/pouchdb/dist/pouchdb.js'  
    ];
    ```
3. Lancer le serveur par la commande : 
```
ionic serve
```

## Utilisation de l'application