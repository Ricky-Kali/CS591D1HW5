import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlphavantageService {
  URL = 'http://localhost:3000/hw4';
  constructor( private httpClient: HttpClient ) { }

  getData() {
    return this.httpClient.get(this.URL);
  }
}
