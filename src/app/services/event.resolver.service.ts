
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { eventActions } from '../event/store/event.action.types';
import { selectAllEventsLoaded } from '../event/store/event.selectors';
import { EventState } from '../event/store/reducers';


@Injectable()
export class EventResolverService implements Resolve<any>{
  loading = false;

  constructor(private store: Store<EventState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store.pipe(
      select(selectAllEventsLoaded),
      tap((eventsLoaded) => {
        if (!this.loading && !eventsLoaded) {
          this.loading = true;
          this.store.dispatch(eventActions.loadAllEvents());
        }
      }),
      filter(eventsLoaded => eventsLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
