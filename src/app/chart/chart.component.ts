import { Chart } from 'angular-highcharts';
import {Component} from "@angular/core";
import {DataService} from "../data.service";
import * as Highcharts from "Highcharts";

@Component({
  selector: 'ChartComponent',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  chart = new Chart({
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Afstand (meter)'
      }
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Tijd'
      }
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b %H:%M:%S}: {point.y:.2f} m'
    },
    series: []
  });

  constructor(public dataService: DataService) {
    for (const beacon in this.dataService.beaconData){
      const data = []; // [[x,y],[x,y]]
      for (const datapoint of this.dataService.beaconData[beacon].datapoints){
        data.push([datapoint.time.getTime(), datapoint.distanceToGateWay]);
      }
      this.chart.addSerie({
        name: beacon,
        data: data
      });
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
    }

  }
}
