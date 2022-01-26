import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';


export const loadAllUsers = createAction(
  '[User Root Resolver] Load all users'
);

export const allUsersLoaded = createAction(
  '[User Effect] Load all users from db',
  props<{ users: User[] }>()
);


export const userCreated = createAction(
  '[User Manage] User created',
  props<{ user: User }>()
);

export const userDeleted = createAction(
  '[User Item] User deleted',
  props<{ id: number }>()
);

export const userEdited = createAction(
  '[User Manage] User updated'
  , props<{update: Update<User>}>()
);
