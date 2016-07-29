import {Page, Platform, NavController, Storage, SqlStorage, LocalStorage} from 'ionic-angular';
import {Output, EventEmitter} from '@angular/core'
import {DisplayTools} from '../../comon/display';
import {CouchDbServices} from '../../../providers/couch/couch';

/*
  Generated class for the PouchParamPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/pouch-db/pouch-param/pouch-param.html',
  providers: [DisplayTools, CouchDbServices]
})
export class PouchParamPage {
  @Output() paramsChange: EventEmitter<any> = new EventEmitter();
  platform: any;
  srvInfo: any;
  store: Storage;
  params: any;
  db: CouchDbServices;
  display: DisplayTools;
  constructor(public nav: NavController, db: CouchDbServices, platform: Platform, display: DisplayTools) {
    this.platform = platform;
    this.db = db;
    this.display = display;
    this.params = { srv: "cdb.gautiersa.fr", base: "", user: "", password: "" };
    this.store = new Storage(LocalStorage);
    this.store.get("pouchParam").then((data) => {
      let par = JSON.parse(data);
      if (par) this.params = par;
    });
    this.srvInfo = null;
  }
  srvTest() {
    console.log("Test server de synchro CouchDB");
    let loading = this.display.displayLoading("Appel du serveur en cours");
    this.srvInfo = null;
    this.db.getDabases(this.params.base, this.params).then((result) => {
      this.srvInfo = result;
      this.store.set("pouchParam", JSON.stringify(this.params));
      loading.dismiss();
      this.paramsChange.emit(this.params);
    }, (error) => {
      this.srvInfo = error;
      this.display.displayToast(error.error + ":" + error.reason);
      loading.dismiss();
    });
  }
}
