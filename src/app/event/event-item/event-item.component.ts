import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/models/event.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { EventManageComponent } from '../event-manage/event-manage.component';
import { EventDataService } from '../../services/event.data.service';
import { eventActions } from '../store/event.action.types';
import { EventState } from '../store/reducers';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() event: Event = null;

  constructor(
    private dialog: MatDialog,
    private eventDataService: EventDataService,
    private store: Store<EventState>) {
  }

  ngOnInit(): void {
  }

  onEditEvent(): void {
    const data = {
      dialogTitle: 'Edit Event',
      event: this.event,
      mode: 'edit'
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(EventManageComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
      });
  }

  onDeleteEvent(): void {
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you really want to delete this event?'
      }
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.delete();
        }
      });
  }

  private delete(): void {
  }
}
