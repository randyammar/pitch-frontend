import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'Pitch';
  showMenu = false;
  isLoggedIn: boolean;

  constructor(public authService: AuthService) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.onAuthenticationCompleted.subscribe(() => {
      this.isLoggedIn = true;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  login() {
    this.authService.startAuthentication();
  }
}