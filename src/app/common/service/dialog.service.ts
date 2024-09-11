import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }
  modal(component: any, entity: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '100%',
      minHeight: '90vh',
      maxHeight: '90vh',
      data: { entity },
    });
  }
  notify(component: any, entity: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '100%',
      minHeight: '50vh',
      maxHeight: '50vh',
      data: { entity },
    });
  }

  alert(alert: string) {
    this.snackBar.open(alert, "Done");
  };

}
