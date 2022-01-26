import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private listOfUsers: Array<User> = [];
  private STORAGE_KEY: string = 'users';
  constructor() {}

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.listOfUsers));
  }

  private loadFromLocalStorage() {
    this.listOfUsers = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  createUser(model: User): Observable<User> {
    this.listOfUsers = [...this.listOfUsers, model as User];
    this.saveToLocalStorage();
    return of(model);
  }

  getUsers(): Observable<User[]> {
    this.loadFromLocalStorage();
    return of(this.listOfUsers);
  }

  getUser(id: number): Observable<User> {
    this.loadFromLocalStorage();
    let user: User;
    this.listOfUsers.forEach((us: User) => {
      if (us.id == id) {
        user = us;
      }
    });
    return of(user);
  }

  editUser(model: User): Observable<User> {
    let user: User;
    this.listOfUsers.forEach((us: User) => {
      if (us.id == model.id) {
        us = model;
      }
    });
    this.saveToLocalStorage();
    return of(user);
  }

  deleteUser(id: number) {
    this.listOfUsers = this.listOfUsers.filter((item) => item.id !== id);
    this.saveToLocalStorage();
    return of(this.listOfUsers);
  }
}
