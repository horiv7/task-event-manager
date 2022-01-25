import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventManageComponent } from './event-manage/event-manage.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromEventState from './store/reducers';
import { EventDataService } from '../services/event.data.service';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from './store/event.effects';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventListComponent,
    EventItemComponent,
    EventManageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature(fromEventState.eventStateFeatureKey, fromEventState.eventReducers),
    EffectsModule.forFeature([EventEffects])
  ],
  providers: [
    EventDataService,
    DatePipe
  ]
})
export class EventModule { }
