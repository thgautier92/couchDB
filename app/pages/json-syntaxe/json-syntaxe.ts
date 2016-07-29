import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Platform, NavController, Alert, Slides } from 'ionic-angular';
import {JsonDemo} from '../../providers/json-demo/json-demo';
import {groupBy, ValuesPipe, KeysPipe} from '../../pipes/common';

declare var JSONFormatter: any;
const myJSON = { ans: 42 };
/*
  Generated class for the JsonSyntaxePage page.
*/
@Component({
  templateUrl: 'build/pages/json-syntaxe/json-syntaxe.html',
  providers: [JsonDemo],
  pipes: [groupBy, ValuesPipe, KeysPipe]
})
export class JsonSyntaxePage implements AfterViewInit {
  platform: Platform;
  formatter: any;
  checkColor: any;
  live: any = "";
  resultDiv: HTMLDivElement;
  listDemo: any;
  links:any;
  selFic: any = "";
  @ViewChild('result') result: ElementRef;
  @ViewChild('slideSyntaxe') slider: Slides;

  constructor(private nav: NavController, platform: Platform, private jsondemo: JsonDemo) {
    this.platform = platform;
    this.checkColor = 'transparent';
    jsondemo.load("simple").then(data => {
      this.live = JSON.stringify(data);
    }, error => {
      let alert = Alert.create({
        title: 'Syntaxe JSON',
        subTitle: error,
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
    this.listDemo = [
      { "title": "Simple", "file": "simple" },
      { "title": "Complexe", "file": "complex" },
      { "title": "Grosse structure", "file": "giant" },
    ];
    jsondemo.load("links_json").then(data => {
      this.links = new groupBy().transform(data, 'group');
      console.log(this.links);
    }, error => {
      this.links=[];
    });
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
  changeFic() {
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
  slideNext(){
    this.slider.slideNext(500);
  }
  slidePrev(){
    this.slider.slidePrev(500);
  }
}
