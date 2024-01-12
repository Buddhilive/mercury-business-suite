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
    <div>{{message}} - {{blog}}</div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class NxWelcomeComponent implements OnInit {
  message!: string;
  blog!: string;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('/api/').subscribe((res) => {
      const response = res as iTestApi;
      this.message = response?.message;
    });

    this.httpClient.get('/api/blog/').subscribe((res) => {
      const response = res as iTestApi;
      this.blog = response?.message;
    });
  }
}
