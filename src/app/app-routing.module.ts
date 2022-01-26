import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { HomeComponent } from './home/home.component';
import { EventResolverService } from './services/event.resolver.service';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'events',
    component: EventListComponent,
    resolve:
    {
      EventResolverService
    }
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [EventResolverService]
})
export class AppRoutingModule { }
