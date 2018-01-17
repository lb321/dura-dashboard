
export class DataPoint {
  public beaconName = '';
  public time: Date;
  public signalStrength: number;
  public distanceToBeacon: number;

  constructor() {

  }

  public setValue(index: number, value: string) {
    switch (index) {
      case 0:
        this.beaconName = value;
        break;
      case 1:
        this.time = new Date(Number.parseInt(value));
        break;
      case 2:
        this.signalStrength = Number.parseFloat(value);
        break;
    }
  }
}
