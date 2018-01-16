import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {httpFactory} from "@angular/http/src/http_module";

@Component({
  selector: 'DataInladenComponent',
  templateUrl: './dataInladen.component.html'
})

export class DataInladenComponent {
  public meetdatum: Date = new Date(Date.now());

  constructor(public http: Http) {

  }

  public uploadfile(file){
    console.log('uploading...');
  }

  public handleFileInput(files) {
    for(const file of files ){
      this.postFile(file);
    }
  }

  public postFile(fileToUpload: File) {
    const endpoint = '/data/' + fileToUpload.name;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    this.http.post(endpoint, formData).subscribe(response => {
      console.log(response);
    });
  }
}
