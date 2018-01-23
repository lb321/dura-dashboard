import {Component} from '@angular/core';
import {DataService} from '../data.service';
import {DataPoint} from '../DataPoint';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'RondetijdComponent',
  templateUrl: './rondetijd.component.html'
})
export class RondetijdComponent {
  public rondeTijden = {};
  public chart = new Chart({
    title: {
      text: 'Rondetijden'
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Duur ronde (seconden)'
      }
    },
   /* tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b %H:%M:%S}: {point.y:.2f} m'
    },*/
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: []
  });

  constructor(public dataService: DataService) {
    const gatewayData = this.dataService.beaconData['zwart'];
    const allBeacons = [];
    for (const beacon in gatewayData) {
      for (const datapoint of gatewayData[beacon]) {
        allBeacons.push(datapoint);
      }
    }

    const sorted = allBeacons.sort((dp1, dp2) => {
      if (dp1.time > dp2.time) return 1;
      if (dp1.time < dp2.time) return -1;
      return 0;
    });

    console.log(sorted);

    let previousDataPoint: DataPoint;
    for (const datapoint of sorted) {
      if (previousDataPoint && previousDataPoint.beaconName != datapoint.beaconName) {
        // opslaan wanneer beacon het laatst is geregistreerd
        if (!this.rondeTijden[previousDataPoint.beaconName]) {
          this.rondeTijden[previousDataPoint.beaconName] = [];
        }
        this.rondeTijden[previousDataPoint.beaconName].push(
          {beaconName: previousDataPoint.beaconName, lastRegistered: previousDataPoint.time, completed: false}
          );
        // opslaan dat de beacon weer is geregistreerd
        for(const beacon in this.rondeTijden) {
          for (const rondetijd of this.rondeTijden[beacon]) {
            if (rondetijd.beaconName == datapoint.beaconName && !rondetijd.completed) {
              rondetijd.nextRegisteredTime = datapoint.time;
              rondetijd.rondetijd = rondetijd.nextRegisteredTime.getTime() - rondetijd.lastRegistered.getTime();
              rondetijd.completed = true;
              break;
            }
          }
        }
      }
      previousDataPoint = datapoint;
    }

    console.log(this.rondeTijden);

    for(const beacon in this.rondeTijden){
      const serie = [];
      let name = '';
      for(const rondetijd of this.rondeTijden[beacon]){
        serie.push(rondetijd.rondetijd / 1000);
        name = rondetijd.beaconName;
      }
      this.chart.addSerie({
        type: 'column',
        name: name,
        data: serie
      });
    }

  }

  private RegisterRondeTijd(datapoint: DataPoint) {

  }
}
