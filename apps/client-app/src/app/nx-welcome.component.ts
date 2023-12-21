import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface iTestApi {
  message: string
}

@Component({
  selector: 'ngnest-nx-welcome',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div>{{message}}</div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class NxWelcomeComponent implements OnInit {
  message!: string;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('/api/').subscribe((res) => {
      const response = res as iTestApi;
      this.message = response?.message;
    });
  }
}
