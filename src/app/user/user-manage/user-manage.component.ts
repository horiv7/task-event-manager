import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import * as userActions from '../store/user.actions';

import { UserState } from '../store/reducers';
import { UserDataService } from 'src/app/services/user.data.service';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  user: User;
  mode: 'edit' | 'create';
  nameMaxLength = 30;
  infoMaxLength = 200;
  unsavedChanges = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserManageComponent>,
    private store: Store<UserState>,
    private dialog: MatDialog,
    private userDataService: UserDataService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
    const formElements = {
      fullname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(this.nameMaxLength),
        ]),
      ],
      email: [null, Validators.required],
      username: [null, Validators.required],
    };
    this.form = this.formBuilder.group(formElements);
    this.form.valueChanges.subscribe((f) => {
      this.unsavedChanges = this.form.dirty;
    });
    if (this.mode === 'edit') {
      this.form.patchValue({ ...this.user });
    }
  }

  ngOnInit(): void {

  }

  onSubmitForm(): void {
    if (!this.form.invalid) {
      const change: User = {
        ...this.user,
        ...this.form.value,
      };
      if (this.mode === 'edit') {
        this.update(change);
      } else if (this.mode === 'create') {
        this.save(change);
      }
    }
  }

  onCancel(): void {
    if (this.unsavedChanges) {
      const data = {
        dialogTitle: 'Confirm',
        data: {
          message:
            'You have unsaved changes, Do you really want to cancel the changes?',
        },
      };
      const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
      this.dialog
        .open(ConfirmDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe((result) => {
          if (result.action === 'yes') {
            this.dialogRef.close();
          }
        });
    } else {
      this.dialogRef.close();
    }
  }

  private save(changes: User): void {
    if (changes.id == null) {
      changes.id = Math.floor((1 + Math.random()) * 100);
    }
    this.userDataService.save(changes).subscribe((user) => {
      this.unsavedChanges = false;
      this.store.dispatch(userActions.userCreated({ user }));
      this.dialogRef.close();
    }
    )
  }

  private update(changes: User): void {
    this.userDataService.update(changes)
      .subscribe(() => {
        const updatedUser: Update<User> = {
          id: changes.id,
          changes
        };
        this.unsavedChanges = false;
        this.store.dispatch(userActions.userEdited({ update: updatedUser }));
        this.dialogRef.close();
      })
  }
}
