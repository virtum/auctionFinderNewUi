import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { LogoutService } from './logout.service';


@Component({
    templateUrl: './logout.component.html',
})

export class LogoutComponent {

    constructor(private logoutService: LogoutService, private sideNav: SideNavComponent) {
        this.logoutService.logout(this.sideNav.isLogged);
    }
}
