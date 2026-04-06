import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  activeItem: string = 'user';

  constructor(private router: Router) {}

  goToUser() {
    this.activeItem = 'user';
    this.router.navigate(['/dashboard/user']);
    this.close.emit();
  }

  goToImages() {
    this.activeItem = 'images';
    this.router.navigate(['/dashboard/images']);
    this.close.emit();
  }

  goToGraphs() {
    this.activeItem = 'graphs';
    this.router.navigate(['/dashboard/graphs']);
    this.close.emit();
  }
}

