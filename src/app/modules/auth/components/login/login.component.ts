import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login-service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patient } from '../../../../core/models/Patient.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() switchMode = new EventEmitter<void>();
  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;
  patient: Patient | null = null;
  subscribtion = new Subscription();

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userType: new FormControl('patient', Validators.required) // Added userType FormControl
    });
  }
  ngOnInit(): void {}

  onLogin(): void {
    this.loginFormSubmitted = true;

    if (this.loginForm.valid) {
      const { email, password, userType } = this.loginForm.value;

      this.loginService.login(email, password, userType).subscribe({
        next: (response) => {
          // Handle successful login response
          console.log('Login successful', response);
          // window.location.reload();
          this.router.navigate(['appointments']);
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

  switchToSignup() {
    this.switchMode.emit();
  }
  onCancel(): void {
    this.loginForm.reset();
    this.loginFormSubmitted = false;
  }
  onSwitchToSignUp() {
    this.switchMode.emit();
  }
}
