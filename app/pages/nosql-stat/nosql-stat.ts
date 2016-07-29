import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Platform, NavController, ViewController, Alert, Slides, Toast, Modal } from 'ionic-angular';
import {JsonDemo} from '../../providers/json-demo/json-demo';
import {CouchDbServices} from '../../providers/couch/couch';
import {groupBy, ValuesPipe, KeysPipe} from '../../pipes/common';
import {Stat} from '../../components/stat/stat';
declare var Chart: any;
/*
  Generated class for the NosqlStatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/nosql-stat/nosql-stat.html',
  directives: [Stat],
  providers: [CouchDbServices]
})
export class NosqlStatPage {
  data: any;
  graphType: any;
  title: any;
  // Couchdb Stats variables
  displayChart: Boolean;
  displayExplain: Boolean = true; 
  stats: any = {};                              // Liste of CouchDB Stats
  generateGraph: any = [];											//array of graph définition
  graphs: any = [];									  					// array of genrated grapgh
  dataLabels: any = ["current", "sum", "mean", "stddev", "min", "max"];	// arrray of value represented
  labels: any = [];
  constructor(private nav: NavController, private couch:CouchDbServices) {
    this.displayChart = false;
    this.data = [12, 19, 3, 5, 2, 3];
    this.graphType = "bar";
    this.title = "Test de chart.js";
  }
  // Get Stats from CouchDB
  getStats() {
    console.log("Read stats from server");
    this.generateGraph = [];
    this.couch.getDabases('_stats', null).then(result => {
      console.log(result);
      this.stats = result;
      this.genGraph().then(rep => {
        console.log(rep);
        this.generateGraph = rep;
        setTimeout(() => {
          this.displayGraphs(rep);
        }, 1000);
      });
    }, error => {
      console.error(error);
    });
  };
  // ===== Generate data for each Graph =====
  genGraph() {
    return new Promise((resolve, reject) => {
      var dataG = [];
      var lstCat = [];
      var i = 1;
      for (var cat in this.stats) {
        let data = this.stats[cat];
        lstCat.push(cat);
        console.log("Categorie", cat, data);
        var opt = {
          "id": i,
          "title": cat,
          "explain": [],
          "type": "bar",
          "graphData": {
            labels: [],
            datasets: []
          }
        };
        var ds = [];
        var dsData = {};
        this.labels = [];
        for (var key in data) {
          var dataKey = data[key];
          console.log("DataKey:", dataKey, key);
          this.labels.push(key);
          opt.explain.push({ "code": key, "lib": dataKey.description });
        };

        for (var label in this.dataLabels) {
          var dataLabel = this.dataLabels[label]
          dsData = {
            label: dataLabel,
            backgroundColor: this.randomColor(),
            borderColor: "rgba(151,187,205,1)",
            hoverBackgroundColor: "rgba(151,187,205,1)",
            hoverBorderColor: "#fff",
            borderWidth: 1,
          };
          //if($scope.debug) console.log(dataLabel, label);
          var dsVal = [];
          for (var key in data) {
            var dataKey = data[key];
            dsVal.push(dataKey[dataLabel]);
          };
          dsData['data'] = dsVal;
          opt.graphData.datasets.push(dsData);
        };
        opt.graphData.labels = this.labels;
        dataG.push(opt);
        i++;
      };
      resolve(dataG);
    });
  };
  displayGraphs(lstGraph) {
    for (var id in lstGraph) {
      var item = this.generateGraph[id];
      var ctx = document.getElementById("canvas_" + item.id);
      switch (item.type) {
        case "bar":
          this.graphs.push(new Chart(ctx, {
            type: "bar",
            data: item.graphData,
            options: {
              responsive: true,
              onAnimationComplete: function () {
                this.showTooltip(this.datasets[0].bars, true)
              },
              showTooltips: true
            }
          }));
          break;
        case "line":
          this.graphs.push(new Chart(ctx).Line(item.graphData, {
            responsive: true
          }));
          break;
        case "Doughnut":
          this.graphs.push(new Chart(ctx).Doughnut(item.graphData, {
            responsive: true,
            tooltipTemplate: "<%= value %>",
            onAnimationComplete: function () {
              this.showTooltip(this.segments, true);
            },
            showTooltips: true
          }));
          break;
        default:
      }
    };
  }
  // ===== Common Function =====
  randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  };
  randomColorFactor() {
    return Math.round(Math.random() * 255);
  };
  randomColor() {
    return 'rgba(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',.7)';
  };
}
