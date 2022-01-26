import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { User } from './../../models/user.model';
import { UserState } from '../store/reducers';
import { UserManageComponent } from '../user-manage/user-manage.component';
import * as UserActions from '../store/user.actions';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  constructor(private dialog: MatDialog, private store: Store<UserState>
  ) { }

  ngOnInit(): void {
  }
  onEditUser(): void {
    const data = {
      dialogTitle: 'User User',
      user: this.user,
      mode: 'edit'
    };
    const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
    this.dialog.open(UserManageComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
      });
  }

  onDeleteUser(): void {
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you really want to delete this user?'
      }
    };
    const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.delete();
        }
      });
  }

  private delete(): void {
    this.store.dispatch(UserActions.userDeleted(this.user)) 
  }

}
