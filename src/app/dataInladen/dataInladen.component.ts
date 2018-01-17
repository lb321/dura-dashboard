import {Component} from "@angular/core";
import {DataService} from "../data.service";

@Component({
  selector: 'DataInladenComponent',
  templateUrl: './dataInladen.component.html'
})

export class DataInladenComponent {
  public meetdatum: Date = new Date(Date.parse('2017-01-17 12:00:00'));
  public startDatumCsv = new Date(Date.parse('2017-12-13T00:00:00'));
  public selectedFile: File;
  private fileContent = '';

  constructor(public dataService: DataService) {
  }

  public readfile() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile);
    fileReader.addEventListener('load', ev => {
      this.fileContent = fileReader.result;
      this.dataService.processFile(this.fileContent, this.meetdatum, this.startDatumCsv);
    });
  }

  public handleFileInput(files) {
    for(const file of files ){
      this.selectedFile = file;
    }
  }
}
