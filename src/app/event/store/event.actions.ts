import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Event } from 'src/app/models/event.model';


export const loadAllEvents = createAction(
  '[Event Root Resolver] Load all events'
);

export const allEventsLoaded = createAction(
  '[Event Effect] Load all events from db',
  props<{ events: Event[] }>()
);

export const eventEdited = createAction(
  '[Event Manage] Event updated'
  , props<{update: Update<Event>}>()
);

export const eventCreated = createAction(
  '[Event Manage] Event created',
  props<{ event: Event }>()
);

export const eventDeleted = createAction(
  '[Event Item] Event deleted',
  props<{ id: number }>()
);

