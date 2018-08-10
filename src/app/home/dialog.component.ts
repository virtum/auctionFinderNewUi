import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogModel } from './dialogModel';

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.html',
  })
  export class DialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogModel) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }