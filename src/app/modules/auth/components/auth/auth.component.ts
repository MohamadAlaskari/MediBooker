import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Handle successful login response
          console.log('Login successful', response);
        },
        error: (error) => {
          // Handle error response
          console.error('Login error', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.loginForm.reset();
    this.loginFormSubmitted = false;
  }
}
