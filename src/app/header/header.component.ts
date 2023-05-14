import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';
  login: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.authService.isLoggedIn === true) {
          this.login = true;
        }
      }
    });
  }

  signOut(): void {
    this.authService.SignOut();
  }
}
