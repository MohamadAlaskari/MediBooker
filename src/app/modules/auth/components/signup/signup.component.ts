import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup-service/signup.service';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;
  loginFormSubmitted: boolean = false;
  currentStep: number = 1;

  constructor(private signUpService: SignupService) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dob: new FormControl('', [Validators.required]),
      phoneNr: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      hNr: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      healthInsurance: new FormControl('', [Validators.required]),
      insuranceNr: new FormControl('', [Validators.required]),
      insuranceType: new FormControl('', [Validators.required]),
    });
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }
  ngOnInit(): void { }

  onSignUp(): void {
    this.loginFormSubmitted = true;
    if (this.signUpForm.valid) {
      const { name, surname, email, password, dob, phoneNr,
        street, hNr, postcode, city,
        healthInsurance, insuranceNr, insuranceType } = this.signUpForm.value;
      this.signUpService.signUp(name, surname, email, password, dob, phoneNr,
        street, hNr, postcode, city,
        healthInsurance, insuranceNr, insuranceType).subscribe({
          next: (response) => {
            console.log('Sign Up successful', response);
          },
          error(error) {
            console.log('Sign Up error', error);
          },
        });

    } else {
      console.log('Form is invalid');
    }
  }
}
