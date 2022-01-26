import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Adapter } from './adapter';

export class User {
    constructor(
        public id: number,
        public fullname: string,
        public email: string,
        public username: string,
    ) { }
}

@Injectable()
export class UserAdapter implements Adapter<User>{

    adapt(user: any): User {
        return new User(
            user.id, 
            user.fullname, 
            user.email, 
            user.username);
    }
}
export function sortUser(user1: User, user2: User): number{
    return moment(user2.id).diff(moment(user1.id));
  }