import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Observable, throwError } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { FindRequestModel } from './findRequestModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  email: string;
  item: string;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private http: Http) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { item: this.item, email: this.email }
    });

    dialogRef.afterClosed().subscribe(input => {
      if (input != undefined) {
        let requestModel: FindRequestModel = {
          item: input.item,
          email: input.email
        };

        this
          .sendNewAuction(requestModel)
          .subscribe(response => {
            // TODO add toast for success
            console.log(response);
          });
      }

      this.email = "";
      this.item = "";
    });
  }

  private sendNewAuction(requestData: FindRequestModel): Observable<String> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this
      .http.post('http://localhost:8080/find', requestData, options)
      .pipe(map(response => {
        let body = response.json();

        return body.response || {};
      }))
      .pipe(catchError(error => {
        // TODO add toast for error here
        this.snackBar.open("message", "action", {
          duration: 4000,
          panelClass: ['red-snackbar']
        });

        return throwError(error);
      }));
  }
}
