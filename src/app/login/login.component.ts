
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{6,}$')
    ])
  });

  constructor(private router: Router) {}

  login() {

    if (this.loginForm.invalid) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const email = (this.loginForm.value.email || '').trim().toLowerCase();
    const password = this.loginForm.value.password;

    const user = users.find((u: any) =>
      (u.email || '').toLowerCase() === email && u.password === password
    );

    if (user) {

      this.loginError = false;

      // STORE LOGGED IN USER
      const loggedUser = {
        username: user.username,
        email: user.email
      };

      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      this.router.navigate(['/dashboard']);

    } 
    else {

      this.loginError = true;

    }

  }

}

