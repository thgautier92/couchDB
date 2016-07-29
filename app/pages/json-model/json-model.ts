import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Platform, NavController, Alert, Toast, Slides } from 'ionic-angular';
import {JsonDemo} from '../../providers/json-demo/json-demo';
import {groupBy, ValuesPipe, KeysPipe} from '../../pipes/common';
import {Record} from '../../components/record/record';

declare var JSONFormatter: any;
/*
  Generated class for the JsonModelPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/json-model/json-model.html',
  providers: [JsonDemo],
  pipes: [groupBy, ValuesPipe, KeysPipe],
  directives: [Record]
})
export class JsonModelPage {
  doNotDo: any = {};
  listModel: any = {};
  listDemo: any = {};
  selFic: any = "";
  selFicComplex: any = "";
  live: any = {};
  resultDiv: HTMLDivElement;
  checkColor:any;
  @ViewChild('resultComplex') resultComplex: ElementRef;
  @ViewChild('slideSyntaxe') slider: Slides;
  constructor(private nav: NavController, private jsondemo: JsonDemo) {
    this.listModel = [
      { "title": "Formulaires SMAVIE Mobilité", "file": "forms" },
    ];
    this.listDemo = [
      { "title": "Stockage des commentaires au sein d'un objet", "file": "donot_1" },
      { "title": "idem", "file": "donot_2" },
      { "title": "item", "file": "donot_3" },
    ];
  }
    ngAfterViewInit() {
    //console.log(this.result);
    //console.log(this.live);
    this.resultDiv = this.resultComplex.nativeElement;
  }
  // Display a JSON formatted, with collapse
  render() {
    try {
      var formatter = new JSONFormatter(JSON.parse(this.live));
      this.resultDiv.innerHTML = '';
      this.resultDiv.appendChild(formatter.render());
      this.checkColor = 'transparent';
    } catch (e) {
      this.checkColor = 'rgba(197, 69, 110, 0.30)';
    }
  }
  // Load a JSON File for demo
  changeFic() {
    this.jsondemo.load(this.selFic.file).then(data => {
      this.live = data;
      this.render();
    }, error => {
      let toast = Toast.create({
        message: error,
        duration: 3000
      });
      this.nav.present(toast);
    });
  }
  changeModelComplex(){
    this.jsondemo.load(this.selFicComplex.file).then(data => {
      this.live = JSON.stringify(data);;
      this.render();
    }, error => {
      let toast = Toast.create({
        message: error,
        duration: 3000
      });
      this.nav.present(toast);
    });
  }
  // Open a external link
  openUrl(url) {
    var dest = "_blank";
    var options = {
      "location": "no",
      "clearcache": "no",
      "toolbar": "no"
    };
    window.open(url, dest);
  }
  // Slides operations for Syntaxe 
  slideNext() {
    this.slider.slideNext(500);
  }
  slidePrev() {
    this.slider.slidePrev(500);
  }
}
