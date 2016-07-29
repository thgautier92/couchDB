import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Platform, NavController, Alert, Slides } from 'ionic-angular';
import {JsonDemo} from '../../providers/json-demo/json-demo';
import {groupBy, ValuesPipe, KeysPipe} from '../../pipes/common';
import {Record} from '../../components/record/record';

declare var JSONFormatter: any;

/*
  Generated class for the JsonDataPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/json-data/json-data.html',
  providers: [JsonDemo],
  pipes: [groupBy, ValuesPipe, KeysPipe],
  directives: [Record]
})
export class JsonDataPage {
  formatter: any;
  checkColor: any;
  live: any = "";
  resultDiv: HTMLDivElement;
  listDemo: any;
  links: any;
  selFic: any = "";
  @ViewChild('result') result: ElementRef;
  @ViewChild('slideSyntaxe') slider: Slides;
  constructor(private nav: NavController, private platform: Platform, private jsondemo: JsonDemo) {
    this.listDemo = [
      { "title": "SmaVie Mobilité V1", "file": "smavie_modele_local" },

    ];
  }
  ngAfterViewInit() {
    //console.log(this.result);
    //console.log(this.live);
    this.resultDiv = this.result.nativeElement;
  }
  valuechange(newValue) {
    this.live = newValue;
    this.render();
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
  changeFic(evt) {
    //console.log("Load demo data",this.selFic);
    this.jsondemo.load(this.selFic.file).then(data => {
      this.live = JSON.stringify(data);
      this.render();
    }, error => {
      let alert = Alert.create({
        title: 'Syntaxe JSON',
        subTitle: error,
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
  }
}
