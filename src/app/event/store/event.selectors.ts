import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './reducers';


export const selectEventState = createFeatureSelector<fromEvent.EventState>(fromEvent.eventStateFeatureKey);

export const selectAllEvents = createSelector(
  selectEventState,
  fromEvent.selectAll
);

export const selectAllEventsLoaded = createSelector(
  selectEventState,
  (state) => state.isEventsLoaded
);

export const selectAllEventEntities = createSelector(
  selectEventState,
  fromEvent.selectEntities
);


