import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  on
} from '@ngrx/store';
import { sortUser, User } from 'src/app/models/user.model';
import { userActions } from '../user.action.types';


export const userStateFeatureKey = 'user';

export interface UserState extends EntityState<User> {
  isUsersLoaded: boolean;
}

export const userAdapter = createEntityAdapter<User>({
  sortComparer: sortUser
});

export const initialUserState: UserState = userAdapter.getInitialState({
  isUsersLoaded: false,
});

export const userReducers = createReducer(
  initialUserState,
  on(userActions.allUsersLoaded, (state, action) => {
    return userAdapter.setAll(action.users, { ...state, isUsersLoaded: true });
  }),
  on(userActions.userEdited, (state, { update }) => {
    return userAdapter.updateOne(update, state);
  }),
  on(userActions.userCreated, (state, { user }) => {
    return userAdapter.addOne(user, state);
  }),
  on(userActions.userDeleted, (state, { id }) => {
    return userAdapter.removeOne(id, state);
  }),
);

export const { selectAll, selectEntities } = userAdapter.getSelectors();
