import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Platform, NavController, ViewController, Alert, Slides, Toast, Modal } from 'ionic-angular';
import {JsonDemo} from '../../providers/json-demo/json-demo';
import {CouchDbServices} from '../../providers/couch/couch';
import {groupBy, ValuesPipe, KeysPipe} from '../../pipes/common';
import {Record} from '../../components/record/record';

const readOptions = [
  { "lib": "10", "opt": 10, },
  { "lib": "20", "opt": 20 },
  { "lib": "50", "opt": 50 },
  { "lib": "100", "opt": 100 }
];

@Component({
  templateUrl: 'build/pages/nosql-concept/nosql-concept.html',
  providers: [JsonDemo, CouchDbServices],
  pipes: [groupBy, ValuesPipe, KeysPipe],
  directives: [Record]
})
export class NosqlConceptPage {
  platform: Platform;
  links: any;
  dbInfo: any = {};
  consult: any = {};
  docsItems: any = [];
  doc: any = { "bonjour": "test" };
  listRange: any = readOptions;
  @ViewChild('slideNosql') slider: Slides;
  constructor(private nav: NavController, platform: Platform, private jsondemo: JsonDemo, private couch: CouchDbServices) {
    this.platform = platform;
    this.consult = { "base": "", "range": 10, "skip": 0 };
    jsondemo.load("links_nosql").then(data => {
      this.links = new groupBy().transform(data, 'group');
    }, error => {
      this.links = [];
    });
  };
  // Open a external link
  openUrl(url) {
    var dest = "_blank";
    var options = {
      "location": "no",
      "clearcache": "no",
      "toolbar": "no"
    };
    window.open(url, dest);
  };
  // Slides operations for Syntaxe 
  slideNext() {
    this.slider.slideNext(500);
  };
  slidePrev() {
    this.slider.slidePrev(500);
  };
  // Couch base Operations
  createBase() {
    this.couch.verifSession(true).then(
      response => {
        if (response['name']) {
          this.callCreate(response['name']);
          this.consult.base = response['name'];
        }
      }, error => {
        //console.log(error);
      }
    )
  };
  callCreate(name) {
    this.couch.createBase(name.toLowerCase(), null).then(response => {
      if (response['ok']) {
        this.getBaseInfo(name);
        this.consult.base = name;
      }
    }, error => {
      console.log(error);
      let toast = Toast.create({
        message: error.reason,
        duration: 3000
      });
      this.nav.present(toast);
      this.getBaseInfo(name);
    })
  };
  getBaseInfo(name) {
    this.couch.getDabases(name.toLowerCase(), null).then(response => {
      //console.log(response);
      this.dbInfo = response;
    }, error => {
      console.log(error);
    })
  };
  // Couch docs operations
  getDocs(event?) {
    this.couch.getDbDocs(this.consult.base.toLowerCase(), this.consult.range, this.consult.skip).then((result) => {
      // handle result
      //console.log(result);
      this.docsItems = result;
      this.consult.skip = Number(result['offset']) + Number(this.consult.range);
    }, (error) => {
      console.log(error);
      this.docsItems = null;
    });
  }
  getDocId(id) {
    console.log("Get doc for ID");
    if (id.length >= 3) {
      this.doc = {};
      this.couch.getDbDoc(this.consult.base.toLowerCase(), id).then(result => {
        //console.log(result);
        this.doc = result;
      }, error => {
        console.log(error);
        this.doc = {};
      });
    }


  };
  // Couch paginate operations
  gotoStart() {
    this.consult.skip = 0;
    this.getDocs();
  }
  gotonext() {
    this.consult.skip = 0;
    this.getDocs();
  }
  // Couch CRUD operations
  addDocs() {
    let modal = Modal.create(MyModal);
    modal.onDismiss(data => {
      if (data) {
        this.couch.addDoc(this.consult.base.toLowerCase(), data, null, null).then(response => {
          let toast = Toast.create({
            message: JSON.stringify(response),
            duration: 3000
          });
          this.nav.present(toast);
        }, error => {
          let toast = Toast.create({
            message: error.reason,
            duration: 3000
          });
          this.nav.present(toast);
        });
      }
    });
    this.nav.present(modal);
  }
}
/* ==================================================
* Modal Dialog, adding data
* ===================================================
*/
@Component({
  templateUrl: 'build/pages/nosql-concept/nosql-addDocs.html',
  providers: [CouchDbServices],
})
class MyModal {
  jsonData: any = '{"aa":"aaa"}';
  idDoc: any;
  checkColor: any;
  constructor(private viewCtrl: ViewController, private couch: CouchDbServices) {
    this.idDoc = this.couch.guid();
  }
  valuechange(newValue) {
    this.jsonData = newValue;
    try {
      var jsonValid = JSON.parse(this.jsonData);
      this.checkColor = 'transparent';
    } catch (e) {
      this.checkColor = 'rgba(197, 69, 110, 0.30)';
    }
  }
  add() {
    var d = JSON.parse(this.jsonData);
    d['id'] = this.idDoc;
    this.viewCtrl.dismiss(d);
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
}
