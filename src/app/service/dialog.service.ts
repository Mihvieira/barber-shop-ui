import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(title: string, message: string): any {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        data: { title, message },
      })
      .afterClosed();
  }
}
