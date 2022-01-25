import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { EventManageComponent } from '../event-manage/event-manage.component';
import { selectAllEvents } from '../store/event.selectors';
import { EventState } from '../store/reducers';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events$: Observable<Event[]>;
  filterText: string;
  constructor(
    private store: Store<EventState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.events$ = this.store.pipe(select(selectAllEvents));
  }

  onAddNewEvent(): void {
    const data = {
      dialogTitle: 'Add New Event',
      event: new Event(null, null, null, null),
      mode: 'create'
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(EventManageComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }
}
