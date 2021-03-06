import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './logout/logout.service';
import { LogoutComponent } from './logout/logout.component';
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
  MatInputModule,
  MatTableModule,
  MatSlideToggleModule
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
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }

import { HomeComponent } from './home/home.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { TableBasicExample } from './table/table-basic-example';
import { CdkDetailRowDirective } from './table/cdk-detail-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    DialogComponent,
    AccountComponent,
    LoginComponent,
    LogoutComponent,
    TableBasicExample,
    CdkDetailRowDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ToastrModule.forRoot(),
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'table', component: TableBasicExample },
      { path: 'logout', component: LogoutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  entryComponents: [DialogComponent],
  providers: [AuthGuard, LoginService, LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
