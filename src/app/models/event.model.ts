import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import * as moment from 'moment';

export class Event {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public date: Date,
    public info?: string,
    public image?: string
  ) { }
}

@Injectable()
export class EventAdapter implements Adapter<Event>{

  adapt(item: any): Event {
    return new Event(item.id
      , item.name
      , item.address
      , item.date
      , item.info
      , item.image);
  }
}

export function sortEvent(e1: Event, e2: Event): number{
  return moment(e2.date).diff(moment(e1.date));
}

