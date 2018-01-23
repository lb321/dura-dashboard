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
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: []
  });
  public gateways = [];

  constructor(public dataService: DataService) {
    /*for (const beacon in this.dataService.beaconData) {
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
    }*/
  }

  public handleGatewayChange() {
    while(this.chart.options.series.length > 0) {
      this.chart.removeSerie(0);
    }
    for(const gateway of this.gateways){
      const gatewayData = this.dataService.beaconData[gateway];
      for (const beacon in gatewayData) {
        const data = []; // [[x,y],[x,y]]
        for (const datapoint of gatewayData[beacon]){
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
}
