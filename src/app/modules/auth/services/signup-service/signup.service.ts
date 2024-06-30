import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  patientEndpoints = environment.endpoints.patient;
  constructor(private apiService: ApiService) {}

  signUp(
    name: string,
    surname: string,
    email: string,
    password: string,
    dob: Date,
    phoneNr: string,
    street: string,
    hNr: string,
    postcode: string,
    city: string,
    healthInsurance: string,
    insuranceNr: string,
    insuranceType: 'private' | 'gesetzlich'
  ): Observable<string> {
    const body = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      dob: dob,
      phoneNr: phoneNr,
      street: street,
      hNr: hNr,
      postcode: postcode,
      city: city,
      healthInsurance: healthInsurance,
      insuranceNr: insuranceNr,
      insuranceType: insuranceType,
    };
    return this.apiService
      .post<{
        token: string;
      }>(`${this.patientEndpoints.signup}`, body)
      .pipe(
        map((response) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('status', 'logedin');
            console.log('token', response.token);

            return response.token;
          }
          throw new Error('No user data received');
        }),
        catchError((error) => {
          console.error('Sign up error:', error);
          return throwError(
            () => new Error(`Sign up failed: ${error.message}`)
          );
        })
      );
  }
}
