import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService implements InMemoryDbService {

  constructor() { }
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const events = [
      {
        id: 1,
        name: 'Lorem Ipsum is simply',
        address: 'London, UK',
        date: '2020-11-12T00:00:00.000Z',
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed vulputate elit. Ut elit urna, tempor non felis non, viverra vulputate ante. Quisque venenatis vel quam vel porta. Lorem ipsum dolor',
        image: 'https://picsum.photos/id/110/800/600'
      },
      {
        id: 2,
        name: 'Sed bibendum tellus liber',
        address: 'New York, NY, USA',
        date: '2018-09-12T00:00:00.000Z',
        info: 'Aliquam erat volutpat. Pellentesque porta a augue non feugiat. Integer a dui non elit volutpat dapibus. Vestibulum commodo sapien libero, eget mattis est viverra ac. Aenean iaculis massa orci',
        image: 'https://picsum.photos/id/1080/800/600'
      },
      {
        id: 3,
        name: 'Pellentesque porta a augue non',
        address: 'Edinburg, Scotland, UK',
        date: '2020-05-09T00:00:00.000Z',
        info: 'In vel erat ac diam ullamcorper posuere quis sit amet lectus. Nullam lobortis ipsum ut aliquam rhoncus. Nunc ornare nisl eros, in vehicula eros tincidunt in. Morbi faucibus felis ipsum, quis elementum',
        image: 'https://picsum.photos/id/1071/800/600'
      },
      {
        id: 4,
        name: 'Integer a dui non elit volutpa',
        address: 'London, UK',
        date: '2020-04-05T00:00:00.000Z',
        info: 'Vestibulum dui ex, fringilla sit amet risus nec, pretium tempor nibh. Vivamus finibus elit massa',
        image: 'https://picsum.photos/id/1069/800/600'
      },
      {
        id: 5,
        name: 'In vel erat ac diam',
        address: 'New Jersey, NJ, USA',
        date: '2020-02-10T00:00:00.000Z',
        info: 'Nunc ornare nisl eros, in vehicula eros tincidunt in. Morbi faucibus felis ipsum, quis elementum',
        image: 'https://picsum.photos/id/1015/800/600'
      },
      {
        id: 6,
        name: 'Sed bibendum hendrerit est',
        address: 'London, UK',
        date: '2020-07-12T00:00:00.000Z',
        info: 'In vel erat ac diam ullamcorper posuere quis sit amet lectus. Nullam lobortis ipsum ut aliquam rhoncus. Nunc ornare nisl eros',
        image: 'https://picsum.photos/id/237/800/600'
      }
    ];

    return { events };
  }

  genId(events: any[]): number {
    return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
  }
}
