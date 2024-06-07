import { Component } from '@angular/core';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';
import { AuthService } from '../../../modules/auth/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../../../core/models/Patient.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  subscribtion = new Subscription();
  currentPatient: Patient | null = null;
  updateForm: FormGroup;
  FormSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      id: new FormControl(''),
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
      insuranceType: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadPatient();

  }

  private loadPatient() {
    this.subscribtion.add(
      this.loginService.getPatientByToken().subscribe({
        next: (patient: Patient) => {
          this.currentPatient = patient;
          console.log(this.currentPatient);

          this.updateForm.patchValue({
            id: this.currentPatient.id,
            name: this.currentPatient.name,
            surname: this.currentPatient.surname,
            email: this.currentPatient.email,
            dob: this.datePipe.transform(this.currentPatient.dob, 'yyyy-MM-dd'),
            phoneNr: this.currentPatient.phoneNr,
            street: this.currentPatient.street,
            hNr: this.currentPatient.hNr,
            postcode: this.currentPatient.postcode,
            city: this.currentPatient.city,
            healthInsurance: this.currentPatient.healthInsurance,
            insuranceNr: this.currentPatient.insuranceNr,
            insuranceType: this.currentPatient.insuranceType
          });
        },
        error: (error) => {
          console.error('an error ocure while fetching Patient: ', error);
        },
      })
    );
  }
  onSubmit() {
    this.FormSubmitted = true;
    if (this.updateForm.valid) {
      const body: Patient = {
        id: this.updateForm.value.id,
        name: this.updateForm.value.name,
        surname: this.updateForm.value.surname,
        email: this.updateForm.value.email,
        password: this.updateForm.value.password,
        dob: this.updateForm.value.dob,
        phoneNr: this.updateForm.value.phoneNr,
        street: this.updateForm.value.street,
        hNr: this.updateForm.value.hNr,
        postcode: this.updateForm.value.postcode,
        city: this.updateForm.value.city,
        healthInsurance: this.updateForm.value.healthInsurance,
        insuranceNr: this.updateForm.value.insuranceNr,
        insuranceType: this.updateForm.value.insuranceType,
        active: this.updateForm.value.active // Ensure active is included
      };

      this.authService.updatepatient(body).subscribe({
        next: (response) => {
          console.log('Update successful', response);
          window.location.reload(); // Reload the page on successful update
        },
        error: (error) => {
          console.error('Update error', error);
          // Optionally, handle the error in the UI
        }
      });
    } else {
      console.error('Form is invalid');

    }
  }




  }

