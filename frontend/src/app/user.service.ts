import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})


export class UserService {
  usersUrl = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient) { }
  getUsers() {
    return this.http.get(this.usersUrl);
  }
}
