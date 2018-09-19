import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './login/login.service';
// import { LogoutService } from './logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //private logoutService: LogoutService
  constructor(private localStorageService: LocalStorageService, private loginService: LoginService) {
    this.isLogged.next(<boolean>this.localStorageService.get('isLogged'));
  }

  login() {
    this.loginService.login(this.isLogged);

  }

  logout() {
    //this.logoutService.logout();
    this.isLogged.next(false);
  }
}
