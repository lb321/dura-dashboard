import {Injectable} from '@angular/core';
import {DataPoint} from './DataPoint';
import KalmanFilter from 'kalmanjs';

@Injectable()
export class DataService {
  public beaconData;
  private startDatumCsv: Date;
  private meetDatum: Date;

  public processFile(filecontent: string, meetdatum: Date, startDatumCsv: Date) {
    this.meetDatum = meetdatum;
    this.startDatumCsv = startDatumCsv;
    this.beaconData = this.CSVToArray(filecontent, ',');

    for(const beacon in this.beaconData) {
      const kalmanFilter = new KalmanFilter({R: 0.01, Q: 3});

      const dataConstantKalman = this.beaconData[beacon].signalStrengths.map(function(v) {
        return kalmanFilter.filter(v);
      });

      for (const i in dataConstantKalman) {
        const distance = (Math.round(this.calculateDistanceLog(dataConstantKalman[i]) * 100) / 100);
        this.beaconData[beacon].datapoints[i].distanceToGateWay = distance;
        this.beaconData[beacon].distances.push(distance);
      }

    }

    console.log(this.beaconData);

    /*var dataConstantKalman = signaalSterktes.map(function(v) {
      return kalmanFilter.filter(v);
    });*/
  }

  private calculateDistanceLog(rssi): number {
    const txPower = -72.0833;
    return Math.pow(10, ((txPower - rssi) / (10 * 2)));
  }

  private CSVToArray(strData: string, strDelimiter: string): Object {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ',');

    // Create a regular expression to parse the CSV values.
    const objPattern = new RegExp(
      (
        // Delimiters.
        '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +

        // Quoted fields.
        '(?:"([^"]*(?:""[^"]*)*)"|' +

        // Standard fields.
        '([^"\\' + strDelimiter + '\\r\\n]*))'
      ),
      'gi'
    );


    // Create an array to hold our data.
    const arrData = {};

    // Create an array to hold our individual pattern
    // matching groups.
    let arrMatches = null;

    let dataPoint: DataPoint = new DataPoint();
    let columnCount = 0;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )) {

      // Get the delimiter that was found.
      const strMatchedDelimiter = arrMatches[ 1 ];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
      ){

        // We have reached a new row of data,
        if (dataPoint) {
          if (arrData[dataPoint.beaconName]) {
            arrData[dataPoint.beaconName].datapoints.push(dataPoint);
            arrData[dataPoint.beaconName].signalStrengths.push(dataPoint.signalStrength);
          } else {
            arrData[dataPoint.beaconName] = {datapoints: [dataPoint], signalStrengths: [dataPoint.signalStrength], distances: []};
          }
        }
        dataPoint = new DataPoint();
        columnCount = 0;
      }

      let strMatchedValue;

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[ 2 ]){

        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[ 2 ].replace(
          new RegExp( '""', 'g' ),
          '"'
        );

      } else {

        // We found a non-quoted value.
        strMatchedValue = arrMatches[ 3 ];

      }

      // als het de geregistreerde tijd is, converteren naar de echte tijd
      if (columnCount == 1) {
        dataPoint.setValue(columnCount, '' +
          (this.meetDatum.getTime() + (new Date(Date.parse(strMatchedValue)).getTime() - this.startDatumCsv.getTime())));
      } else {
        dataPoint.setValue(columnCount, strMatchedValue);
      }
      columnCount++;
      // Now that we have our value string, let's add
      // it to the data array.
      //arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
  }

}
