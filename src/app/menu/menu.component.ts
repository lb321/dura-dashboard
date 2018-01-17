import {Component} from "@angular/core";
import {DataService} from "../data.service";

@Component({
  selector: 'MenuComponent',
  templateUrl: './menu.component.html'
})

export class MenuComponent {
  constructor(public dataService: DataService) {
  }
}
