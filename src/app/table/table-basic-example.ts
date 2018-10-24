import { Component, Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of, throwError } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, catchError } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';

/**
 * @title Basic table
 */
@Component({
    selector: 'table-basic-example',
    styleUrls: ['table-basic-example.css'],
    templateUrl: 'table-basic-example.html',
    animations: [
        trigger('detailExpand', [
            state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('*', style({ height: '*', visibility: 'visible' })),
            transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TableBasicExample {
    displayedColumns = ['itemName', 'numberOfFoundItems', 'creationDate'];
    dataSource = new ExampleDataSource(this.http);

    isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

    private singleChildRowDetail: boolean = false;

    private openedRow: CdkDetailRowDirective

    constructor(private http: Http) { }


    onToggleChange(cdkDetailRow: CdkDetailRowDirective): void {
        if (this.singleChildRowDetail && this.openedRow && this.openedRow.expended) {
            this.openedRow.toggle();
        }
        this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
    }
}

export interface UserSubscriptions {
    itemName: string;
    numberOfFoundItems: number;
    creationDate: string;
    urls: string[];
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {

    constructor(private http: Http) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserSubscriptions[]> {
        return this.getUserSubscriptions();
    }

    disconnect() { }

    getUserSubscriptions(): Observable<UserSubscriptions[]> {
        console.log('getting subscriptions');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http
            .get('http://localhost:8080/rest/subscriptions', options)
            .pipe(map(response => {
                const body = response.json();

                console.log(body);

                return body.userSubscriptions || [];
            }), catchError(error => {
                this.handleError(error);
                return throwError(error);
            }));
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
