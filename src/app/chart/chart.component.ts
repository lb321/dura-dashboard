import { Chart } from 'angular-highcharts';
import {Component} from "@angular/core";
import {DataService} from "../data.service";

@Component({
  selector: 'ChartComponent',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  chart = new Chart({
    chart: {
      type: 'scatter'
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
    series: []
  });

  constructor(public dataService: DataService) {
    for(const beacon in this.dataService.beaconData){
      const data = []; // [[x,y],[x,y]]
      for(const datapoint of this.dataService.beaconData[beacon].datapoints){
        data.push([datapoint.time.toString(), datapoint.distanceToGateWay]);
      }
      this.chart.addSerie({
        name: beacon,
        data: data
      });
      console.log(data);
    }

  }
}
