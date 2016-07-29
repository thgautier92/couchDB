import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CouchDbServices} from '../../providers/couch/couch';
import {AuthPage} from '../auth/auth';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CouchDbServices]
})
export class HomePage {
  user: any ={};
  constructor(private navController: NavController, private couch: CouchDbServices) {
    this.couch.verifSession(true).then(response => {
      this.user=response;
     }, error => { 
       this.logout();
     });
  }
  logout() {
    //this.user = null;
    this.couch.closeSession();
    this.navController.remove(0, this.navController.length() - 1);
    this.navController.pop();
  }
}
