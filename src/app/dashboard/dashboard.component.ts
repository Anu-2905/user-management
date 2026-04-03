import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSidebarOpen = false;

  username: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
  const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  this.username = user.username || '';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
goToLogout() {
  console.log("Logout clicked");

  localStorage.removeItem('loggedUser'); // ✅ only remove login data

  this.router.navigateByUrl('/login');
}
  
}