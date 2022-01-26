import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import * as fromUserState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { UserDataService } from '../services/user.data.service';



@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
    UserManageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature(fromUserState.userStateFeatureKey, fromUserState.userReducers),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
   UserDataService
  ]
})
export class UserModule { }
