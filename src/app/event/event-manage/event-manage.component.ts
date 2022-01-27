import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/event.model';
import * as moment from 'moment';
import { EventDataService } from '../../services/event.data.service';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { EventState } from '../store/reducers';
import { eventCreated, eventEdited } from '../store/event.actions';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-event-manage',
  templateUrl: './event-manage.component.html',
  styleUrls: ['./event-manage.component.scss']
})
export class EventManageComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  event: Event;
  mode: 'edit' | 'create';
  nameMaxLength = 30;
  infoMaxLength = 200;
  unsavedChanges = false;
  @ViewChild('uploader') uploader: ElementRef;
  private file: File = null;
  public image: string | ArrayBuffer | SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EventManageComponent>,
    private eventDataService: EventDataService,
    private store: Store<EventState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialogTitle = data.dialogTitle;
    this.event = data.event;
    this.mode = data.mode;
    this.image = data.event.image;
    const formElements = {
      name: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(this.nameMaxLength)])],
      address: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      info: [null, Validators.maxLength(this.infoMaxLength)]
    };
    this.form = this.formBuilder.group(formElements);
    this.form.valueChanges.subscribe(f => {
      this.unsavedChanges = this.form.dirty;
      if (f.date) {
        this.form.patchValue({
          date: new Date(moment(f.date).format('M/DD/YYYY'))
        }, { emitEvent: false }),
        {
          time: moment(f.date).format("HH:mm")
        }
      }
    });
    if (this.mode === 'edit') {
      this.form.patchValue({ ...this.event, time: moment(this.event.date).format("HH:mm") });
    }
  }

  ngOnInit(): void {

  }

  onSubmitForm(): void {
    if (!this.form.invalid) {
      const change: Event = {
        ...this.event,
        ...this.form.value,
        date: moment(this.form.value.date).add(this.form.value.time, 'HH:mm').toDate(),
        image: this.image
      };

      if (this.mode === 'edit') {
        this.update(change);
      }
      else if (this.mode === 'create') {
        this.save(change);
      }
    }
  }

  private update(changes: Event): void {
    this.eventDataService.update(changes)
      .subscribe(() => {
        const updatedEvent: Update<Event> = {
          id: changes.id,
          changes
        };
        this.unsavedChanges = false;
        this.store.dispatch(eventEdited({ update: updatedEvent }));
        this.dialogRef.close();
      });
  }

  private save(changes: Event): void {
    this.eventDataService.save(changes)
      .subscribe((event) => {
        this.unsavedChanges = false;
        this.store.dispatch(eventCreated({ event }));
        this.dialogRef.close();
      });
  }

  onCancel(): void {
    if (this.unsavedChanges) {
      const data = {
        dialogTitle: 'Confirm',
        data: {
          message: 'You have unsaved changes, Do you really want to cancel the changes?'
        }
      };
      const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
      this.dialog.open(ConfirmDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe((result) => {
          if (result.action === 'yes') {
            this.dialogRef.close();
          }
        });
    }
    else {
      this.dialogRef.close();
    }
  }

  onChangeImage(): void {
    this.uploader.nativeElement.click();
  }

  onImageUpload(fileUploader: any): void {
    this.file = fileUploader.target.files[0];
    this.previewImage();
  }

  private previewImage(): void {
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.file);
    fileReader.onload = ((e) => {
      this.image = fileReader.result;
    });
  }

  onRemoveImage(): void {
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you want to remove this image?'
      }
    };
    const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.image = '';
          this.unsavedChanges = true;
        }
      });
  }
}
