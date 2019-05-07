import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {
  URL = 'http://localhost:3000/oauth/google';
  constructor(private httpClient: HttpClient) { }

  login() {
    window.location.assign(this.URL);
  }
}
