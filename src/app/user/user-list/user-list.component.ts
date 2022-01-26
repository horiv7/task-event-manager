import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { UserState } from '../store/reducers';
import { selectAllUsers } from '../store/user.selectors';
import { UserManageComponent } from '../user-manage/user-manage.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(
    private store: Store<UserState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectAllUsers))
  }

  onAddNewUser(): void {
    const data = {
      dialogTitle: 'Add New User',
      user: new User(null, null, null, null),
      mode: 'create'
    };
    const dialogConfig = { ...defaultDialogConfig, ...{ data } };
    this.dialog.open(UserManageComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

}
