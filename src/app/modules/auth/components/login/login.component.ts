import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });

  }
  ngOnInit(): void { }

  onLogin(): void {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
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



