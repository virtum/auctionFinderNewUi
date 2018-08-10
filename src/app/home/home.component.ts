import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
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

  constructor(public dialog: MatDialog, private http: Http) { }

  openDialog(): void {
    this.email = "";
    this.item = "";

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { item: this.item, email: this.email }
    });

    dialogRef.afterClosed().subscribe(input => {
      if (input != undefined) {
        // this.email = input.email;
        // this.item = input.item;

        let requestModel: FindRequestModel = {
          item: this.item,
          email: this.email
        };

        this
          .sendNewAuction(requestModel)
          .subscribe(response => {
            // TODO add toas for success
            console.log(response);
          });
      }
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
        return throwError(error);
      }));
  }
}
