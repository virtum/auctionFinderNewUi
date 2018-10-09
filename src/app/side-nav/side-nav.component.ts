import { Component, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../login/login.service';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

@Injectable()
export class SideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver, private localStorageService: LocalStorageService, private loginService: LoginService, private logoutService: LogoutService) {
    this.isLogged.next(<boolean>this.localStorageService.get('isLogged'));
    console.log(this.localStorageService.get('isLogged'));
  }

  login() {
    this.loginService.login(this.isLogged);
  }

  logout() {
    this.logoutService.logout();
    this.isLogged.next(false);
  }
}
