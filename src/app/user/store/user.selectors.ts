import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './reducers';


export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userStateFeatureKey);

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAll
);

export const selectAllUsersLoaded = createSelector(
  selectUserState,
  (state) => state.isUsersLoaded
);

export const selectAllUserEntities = createSelector(
  selectUserState,
  fromUser.selectEntities
);


