import { Component, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    dataSource = new ExampleDataSource();

    isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

    private singleChildRowDetail: boolean = false;

    private openedRow: CdkDetailRowDirective
    onToggleChange(cdkDetailRow: CdkDetailRowDirective): void {
        if (this.singleChildRowDetail && this.openedRow && this.openedRow.expended) {
            this.openedRow.toggle();
        }
        this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
    }
}

export interface Element {
    itemName: string;
    numberOfFoundItems: number;
    creationDate: string;
    symbol: string;
}

const data: Element[] = [
    { itemName: 'Hydrogen', numberOfFoundItems: 1.0079, creationDate: '2018-08-08', symbol: 'H' },
    { itemName: 'Helium', numberOfFoundItems: 4.0026, creationDate: '2018-08-08', symbol: 'He' },
    { itemName: 'Lithium', numberOfFoundItems: 6.941, creationDate: '2018-08-08', symbol: 'Li' },
    { itemName: 'Beryllium', numberOfFoundItems: 9.0122, creationDate: '2018-08-08', symbol: 'Be' },
    { itemName: 'Boron', numberOfFoundItems: 10.811, creationDate: '2018-08-08', symbol: 'B' },
    { itemName: 'Carbon', numberOfFoundItems: 12.0107, creationDate: '2018-08-08', symbol: 'C' },
    { itemName: 'Nitrogen', numberOfFoundItems: 14.0067, creationDate: '2018-08-08', symbol: 'N' },
    { itemName: 'Oxygen', numberOfFoundItems: 15.9994, creationDate: '2018-08-08', symbol: 'O' },
    { itemName: 'Fluorine', numberOfFoundItems: 18.9984, creationDate: '2018-08-08', symbol: 'F' },
    { itemName: 'Neon', numberOfFoundItems: 20.1797, creationDate: '2018-08-08', symbol: 'Ne' },
    { itemName: 'Sodium', numberOfFoundItems: 22.9897, creationDate: '2018-08-08', symbol: 'Na' },
    { itemName: 'Magnesium', numberOfFoundItems: 24.305, creationDate: '2018-08-08', symbol: 'Mg' },
    { itemName: 'Aluminum', numberOfFoundItems: 26.9815, creationDate: '2018-08-08', symbol: 'Al' },
    { itemName: 'Silicon', numberOfFoundItems: 28.0855, creationDate: '2018-08-08', symbol: 'Si' },
    { itemName: 'Phosphorus', numberOfFoundItems: 30.9738, creationDate: '2018-08-08', symbol: 'P' },
    { itemName: 'Sulfur', numberOfFoundItems: 32.065, creationDate: '2018-08-08', symbol: 'S' },
    { itemName: 'Chlorine', numberOfFoundItems: 35.453, creationDate: '2018-08-08', symbol: 'Cl' },
    { itemName: 'Argon', numberOfFoundItems: 39.948, creationDate: '2018-08-08', symbol: 'Ar' },
    { itemName: 'Potassium', numberOfFoundItems: 39.0983, creationDate: '2018-08-08', symbol: 'K' },
    { itemName: 'Calcium', numberOfFoundItems: 40.078, creationDate: '2018-08-08', symbol: 'Ca' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Element[]> {
        return of(data);
    }

    disconnect() { }
}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */