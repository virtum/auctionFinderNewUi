import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    // this.isLogged.next(<boolean>this.localStorageService.get('isLogged'));
  }
}
