import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';
import { SideNavComponent } from '../side-nav/side-nav.component';


@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent {

    constructor(private loginService: LoginService, private sideNav: SideNavComponent) {
        console.log('login component');
        this.loginService.login(this.sideNav.isLogged);
    }
}
