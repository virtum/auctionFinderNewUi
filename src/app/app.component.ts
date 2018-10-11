import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private localStorageService: LocalStorageService) {
    console.log('appComponent ctor: logged: ' + localStorageService.get('isLogged'));
  }
}
