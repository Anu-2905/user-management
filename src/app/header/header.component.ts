import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedName: string | null = null;

  constructor(private router: Router) {
    const session = localStorage.getItem('loggedUser');
    if (session) {
      try {
        this.loggedName = JSON.parse(session).fname;
      } catch {
        this.loggedName = null;
      }
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}