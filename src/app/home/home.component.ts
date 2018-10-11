import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Observable, throwError } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { FindRequestModel } from './findRequestModel';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  email: string;
  item: string;

  constructor(public dialog: MatDialog, private http: Http, private toast: ToastrService, private localStorageService: LocalStorageService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { item: this.item, email: this.email }
    });

    dialogRef.afterClosed().subscribe(input => {
      if (input !== undefined) {
        const requestModel: FindRequestModel = {
          item: input.item,
          email: input.email
        };

        this
          .sendNewAuction(requestModel)
          .subscribe(response => {
            this.showSuccess();
            console.log(response);
          });
      }

      this.email = '';
      this.item = '';
    });
  }

  private sendNewAuction(requestData: FindRequestModel): Observable<String> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this
      .http.post('http://localhost:8080/find', requestData, options)
      .pipe(map(response => {
        const body = response.json();

        return body.response || {};
      }))
      .pipe(catchError(error => {
        this.showError();

        return throwError(error);
      }));
  }

  private showSuccess() {
    this.toast.success('Subskrypcja została stworzona!', 'Sukces!', { timeOut: 4000 });
  }

  private showError() {
    this.toast.error('Subskrypcja nie została dodana, spróbuj ponownie!', 'Oops!', { timeOut: 4000 });
  }
}
