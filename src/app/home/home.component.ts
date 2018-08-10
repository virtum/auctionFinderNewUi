import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogModel } from './dialogModel';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  email: string;
  item: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.email = "";
    this.item = "";

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { item: this.item, email: this.email }
    });

    dialogRef.afterClosed().subscribe(input => {
      console.log('The dialog was closed');
      this.email = input.email;
      this.item = input.item;
    });
  }

}
