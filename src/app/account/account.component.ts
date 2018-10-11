import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private localStorageService: LocalStorageService) {
    console.log('account logged: ' + this.localStorageService.get('isLogged'));
  }
}
