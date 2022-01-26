import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user.data.service';
import { userActions } from './user.action.types';


@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userDataService: UserDataService) { }
    loadAllUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(userActions.loadAllUsers)
            , concatMap(action => this.userDataService.get())
            , map((users: User[]) => userActions.allUsersLoaded({ users }))
        ),
    )
}
