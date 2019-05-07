import { Component, OnInit } from '@angular/core';
import {AlphavantageService} from '../alphavantage.service';
import {GoogleOauthService} from '../google-oauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list = {};

  constructor(
    private alphaVantage: AlphavantageService,
    private google: GoogleOauthService,
  ) {}

  ngOnInit() {
    this.display();
  }

  display() {
    this.alphaVantage.getData()
      .subscribe( data => {this.list = data; console.log(data); });
  }

  login(): void {
    this.google.login();
  }
}
