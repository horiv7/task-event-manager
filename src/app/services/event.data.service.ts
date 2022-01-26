import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event, EventAdapter } from '../models/event.model';
import * as moment from 'moment';

@Injectable()
export class EventDataService {
  constructor(
    private http: HttpClient,
    private adapter: EventAdapter) { }

  get(): Observable<Event[]> {
    console.log('get');
    return this.http
      .get<Event[]>('events')
      .pipe(
        map((data: any[]) => data.map(item => this.adapter.adapt(item))),
        catchError(this.handleError),
      );
  }

  save(event: Event): Observable<Event> {
    console.log('save');
    return this.http
      .post('events',
        {
          id: event.id,
          name: event.name,
          address: event.address,
          date: moment(event.date).toISOString(),
          image: event.image,
        })
      .pipe(
        map(item => this.adapter.adapt(item)),
        catchError(this.handleError)
      );
  }

  update(event: Event): Observable<any>{
    return this.http
      .put(`events/${event.id}`,
        {
          id: event.id,
          name: event.name,
          address: event.address,
          date: moment(event.date).toISOString(),
          image: event.image,
        })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(event: Event): Observable<any>{
    return this.http
      .delete(`events/${event.id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const customErrorMessage = 'An unknown error occurred!';
    return throwError(customErrorMessage);
  }
}
