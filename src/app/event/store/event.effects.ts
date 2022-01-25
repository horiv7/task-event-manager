import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';
import { EventDataService } from '../../services/event.data.service';
import { eventActions } from './event.action.types';


@Injectable()
export class EventEffects{
  constructor(private actions$: Actions, private eventDataService: EventDataService){}
  loadAllEvents$ = createEffect(
    () => this.actions$.pipe(
      ofType(eventActions.loadAllEvents)
      , concatMap(action => this.eventDataService.get())
      , map((events: Event[]) => eventActions.allEventsLoaded({ events }))
    ));
}
