import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup-service/signup.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastNotificationsService } from '../../../../shared/services/toast-notifications/toast-notifications.service';

declare var bootstrap: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @ViewChild('signupModal') signupModal!: ElementRef;
  signUpForm: FormGroup;
  currentStep: number = 1;
  loginFormSubmitted: boolean = false;

  constructor(
    private signUpService: SignupService,
    private toastService: ToastNotificationsService
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      dob: new FormControl('', [Validators.required]),
      phoneNr: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      hNr: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      healthInsurance: new FormControl('', [Validators.required]),
      insuranceNr: new FormControl('', [Validators.required]),
      insuranceType: new FormControl('gesetzlich', [Validators.required]), // Default value set to 'gesetzlich'
    });
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }

  onSignUp(): void {
    this.loginFormSubmitted = true;
    if (this.signUpForm.valid) {
      const {
        name,
        surname,
        email,
        password,
        dob,
        phoneNr,
        street,
        hNr,
        postcode,
        city,
        healthInsurance,
        insuranceNr,
        insuranceType,
      } = this.signUpForm.value;
      this.signUpService
        .signUp(
          name,
          surname,
          email,
          password,
          dob,
          phoneNr,
          street,
          hNr,
          postcode,
          city,
          healthInsurance,
          insuranceNr,
          insuranceType
        )
        .subscribe({
          next: (response) => {
            console.log('Sign Up successful', response);
            this.toastService.showSuccess(
              'Signup successful! Please login to continue.',
              'Signup Successful'
            );
            this.switchToLogin();
          },
          error: (error) => {
            console.log('Sign Up error', error);
            this.toastService.showError(
              'Signup failed. Please try again.',
              'Signup Error'
            );
          },
        });
    } else {
      console.log('Form is invalid');
      this.toastService.showError(
        'Please fill in all required fields correctly.',
        'Form Invalid'
      );
    }
  }

  openModal(): void {
    const modalElement = this.signupModal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  closeModal(): void {
    const modalElement = this.signupModal.nativeElement;
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

  switchToLogin(): void {
    this.closeModal();
    setTimeout(() => {
      const loginModalElement = document.getElementById('loginmodal');
      if (loginModalElement) {
        const bootstrapLoginModal = new bootstrap.Modal(loginModalElement);
        bootstrapLoginModal.show();
      }
    }, 500); // Adjust the delay as necessary
  }
}
