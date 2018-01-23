import {Component} from '@angular/core';
import {DataService} from '../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'DataInladenComponent',
  templateUrl: './dataInladen.component.html'
})

export class DataInladenComponent {
  public meetdatum: Date = new Date(Date.parse('2017-01-17T12:00:00'));
  public startDatumCsv: Date = new Date(Date.parse('2017-12-13T00:00:00'));
  public selectedFile: File;
  public errors = [];
  public gateway = 'zwart';
  private fileContent = '';

  constructor(public dataService: DataService, public router: Router) {
  }

  public readfile() {
    this.errors = [];
    if (typeof this.meetdatum == typeof '') {
      this.meetdatum = new Date(Date.parse(this.meetdatum + ''));
    }
    try {
      this.meetdatum.getTime();
    } catch (e) {
      this.errors.push('Geef een geldige meetdatum');
    }
    try {
      this.startDatumCsv.getTime();
    } catch (e) {
      this.errors.push('Geef een geldige startdatum van het csv bestand.');
    }
    if (!this.selectedFile) this.errors.push('Selecteer een meetbestand.')
    if (this.errors.length > 0) return;

    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile);
    fileReader.addEventListener('load', ev => {
      this.fileContent = fileReader.result;
      this.dataService.processFile(this.fileContent, this.meetdatum, this.startDatumCsv, this.gateway);
      this.router.navigateByUrl('/grafiek');
    });
  }

  public handleFileInput(files) {
    for(const file of files ){
      this.selectedFile = file;
    }
  }

}
