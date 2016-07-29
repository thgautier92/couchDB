import {Component} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import {JsonModelPage} from '../json-model/json-model';
import {JsonSyntaxePage} from '../json-syntaxe/json-syntaxe';
import {JsonDataPage} from '../json-data/json-data';
import {NosqlConceptPage} from '../nosql-concept/nosql-concept';
import {ComplexFormsPage} from '../complex-forms/complex-forms';
import {PouchDbPage} from '../pouch-db/pouch-db';
import {NosqlStatPage} from '../nosql-stat/nosql-stat';

@Component({
  templateUrl: 'build/pages/learn/learn.html'
})
export class LearnPage {
  itemsJson: any;
  itemsCouch: any;
  constructor(private navController: NavController) {
    this.itemsJson = [
      { "title": "La syntaxe", "page": JsonSyntaxePage, "img": "JSON_vector_logo.svg.png", "des": "Découvrier et apprendre la syntaxe JSON" },
      { "title": "le Modèle", "page": JsonModelPage, "img": "json_logo.png", "des": "Conception d'un modèle de données à partir de la notation JSON" },
      { "title": "les données", "page": JsonDataPage, "img": "json_data.jpg", "des": "Description de données à partir d'un modèle" },
    ];
    this.itemsCouch = [
      { "title": "Stockage JSON", "page": NosqlConceptPage, "img": "CouchDB.png", "des": "Présentation de CouchDB" },
      { "title": "CRUD", "page": ComplexFormsPage, "img": "crud.png", "des": "create, read, update, delete" },
      { "title": "Stockage Local", "page": PouchDbPage, "img": "pouchdb-couchdb.png", "des": "PouchDB, en synchronisation avec CouchDB" },
      { "title": "Statistiques", "page": NosqlStatPage, "img": "chartjs-logo.svg", "des": "Statistiques d'usage" },
      { "title": "L'exploitation d'une base NoSQL", "page": "", "img": "json_data.jpg", "des": "Description des principaux mecanismes de répartition de charges, d'optimisation et de surveillance opérationnelle d'un serveur NoSQL" },
    ];
  }
  startLearn(item) {
    this.navController.push(item.page);
  }
}
