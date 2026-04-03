import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';

  ngOnInit() {
    const data = localStorage.getItem('loggedUser');

    if (data) {
      const user = JSON.parse(data);
      this.userName = user.username;
      this.userEmail = user.email;
    }
  }
}