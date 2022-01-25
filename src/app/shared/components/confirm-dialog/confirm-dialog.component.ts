import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  dialogTitle: string;
  data: any;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.dialogTitle = data.dialogTitle;
    this.data = data.data;
  }

  ngOnInit(): void {
  }

  onYes(): void {
    this.dialogRef.close({
      action: 'yes'
    });
  }

  onCancel(): void {
    this.dialogRef.close({
      action: 'no'
    });
  }
}
