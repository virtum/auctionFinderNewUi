import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';
import { SideNavComponent } from '../side-nav/side-nav.component';


@Component({
    templateUrl: './login.component.html',
})

@Injectable()
export class LoginComponent {

    constructor(private loginService: LoginService, private sideNav: SideNavComponent) {
        this.loginService.login(this.sideNav.isLogged);
    }
}
