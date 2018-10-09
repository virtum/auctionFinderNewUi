import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {

  constructor(private localStorageService: LocalStorageService, private loginService: LoginService) {
  }

}
