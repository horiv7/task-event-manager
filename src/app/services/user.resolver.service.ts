
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import * as userActions  from '../user/store/user.actions';
import * as UserSelector from '../user/store/user.selectors';
import { UserState } from '../user/store/reducers';


@Injectable()
export class UserResolverService implements Resolve<any>{
  loading = false;

  constructor(private store: Store<UserState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store.pipe(
      select(UserSelector.selectAllUsersLoaded),
      tap((usersLoaded) => {
        if (!this.loading && !usersLoaded) {
          this.loading = true;
          this.store.dispatch(userActions.loadAllUsers());
        }
      }),
      filter(usersLoaded => usersLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
