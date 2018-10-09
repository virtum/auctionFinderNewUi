import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './logout/logout.service';
import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { AuthGuard } from './guard/authGuard.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }

import { HomeComponent } from './home/home.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    DialogComponent,
    AccountComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    HttpModule,
    CommonModule,
    LocalStorageModule.withConfig({ storageType: 'localStorage' }),
    ToastrModule.forRoot(),
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  entryComponents: [HomeComponent, DialogComponent],
  providers: [AuthGuard, LocalStorageService, LoginComponent, LoginService, LogoutService, AppComponent, SideNavComponent],
  bootstrap: [AppComponent, SideNavComponent]
})
export class AppModule { }
