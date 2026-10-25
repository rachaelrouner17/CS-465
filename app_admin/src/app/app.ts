import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication';

@Component({
  imports: [CommonModule, RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly title = 'Travlr Getaways Admin';

  constructor(
    readonly authentication: AuthenticationService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.authentication.logout();
    this.router.navigate(['/']);
  }
}
