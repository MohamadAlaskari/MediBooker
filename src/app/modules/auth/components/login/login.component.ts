import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login-service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patient } from '../../../../core/models/Patient.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ToastNotificationsService } from '../../../../shared/services/toast-notifications/toast-notifications.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('loginmodal') loginmodal!: ElementRef;
  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;
  patient: Patient | null = null;
  subscription = new Subscription();

  constructor(
    private toastService: ToastNotificationsService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      userType: new FormControl('patient', Validators.required),
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.loginFormSubmitted = true;

    if (this.loginForm.valid) {
      const { loginEmail, loginPassword, userType } = this.loginForm.value;

      this.loginService.login(loginEmail, loginPassword, userType).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('usertype', userType);

          this.toastService.showSuccess(
            `Welcome back ${userType}!`,
            'Login Successful'
          );
          this.closeModal();
          window.location.reload();
        },
        error: (error) => {
          console.error('Login error', error);
          this.toastService.showError(
            'Login failed. Please try again.',
            'Login Error'
          );
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

  openModal(): void {
    const modalElement = this.loginmodal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  closeModal(): void {
    const modalElement = this.loginmodal.nativeElement;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    if (bootstrapModal) {
      bootstrapModal.hide();
      modalElement.addEventListener(
        'hidden.bs.modal',
        () => {
          document
            .querySelectorAll('.modal-backdrop')
            .forEach((el) => el.remove());
        },
        { once: true }
      );
    }
  }

  switchToSignup(): void {
    this.closeModal();
    setTimeout(() => {
      const signupModalElement = document.getElementById('signupModal');
      if (signupModalElement) {
        const bootstrapSignupModal = new bootstrap.Modal(signupModalElement);
        bootstrapSignupModal.show();
      }
    }, 500); // Adjust the delay as necessary
  }
}
