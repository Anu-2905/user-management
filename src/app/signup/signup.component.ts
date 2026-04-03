
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailExists = false;

  signupForm = new FormGroup({
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]),
    lname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{6,}$')
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private router: Router) {}

  signup() {

    if (this.signupForm.invalid) return;

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const email = (this.signupForm.value.email || '').trim().toLowerCase();

    const userExists = users.find((u: any) => (u.email || '').toLowerCase() === email);

    if (userExists) {
      this.emailExists = true;
      return;
    }

    this.emailExists = false;

    const newUser = {
      username: this.signupForm.value.fname + " " + this.signupForm.value.lname,
      fname: this.signupForm.value.fname,
      lname: this.signupForm.value.lname,
      email: email,
      password: this.signupForm.value.password
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account Created Successfully');

    this.signupForm.reset();

    this.router.navigate(['/login']);
  }

}

