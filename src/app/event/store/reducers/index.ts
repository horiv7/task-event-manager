import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  on
} from '@ngrx/store';
import { Event, sortEvent } from 'src/app/models/event.model';
import { eventActions } from '../event.action.types';


export const eventStateFeatureKey = 'event';

export interface EventState extends EntityState<Event> {
  isEventsLoaded: boolean;
}

export const eventAdapter = createEntityAdapter<Event>({
  sortComparer: sortEvent
});

export const initialEventState: EventState = eventAdapter.getInitialState({
  isEventsLoaded: false,
});

export const eventReducers = createReducer(
  initialEventState,
  on(eventActions.allEventsLoaded, (state, action) => {
    return eventAdapter.setAll(action.events, { ...state, isEventsLoaded: true });
  }),
  on(eventActions.eventEdited, (state, { update }) => {
    return eventAdapter.updateOne(update, state);
  }),
  on(eventActions.eventCreated, (state, { event }) => {
    return eventAdapter.addOne(event, state);
  }),
  on(eventActions.eventDeleted, (state, { id }) => {
    return eventAdapter.removeOne(id, state);
  }),
);

export const { selectAll, selectEntities } = eventAdapter.getSelectors();
