import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';
  login: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  signIn(): void {
    this.login = !this.login;
  }
}
