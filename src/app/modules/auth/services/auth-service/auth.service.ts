import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { environment } from '../../../../../enviroments/enviroment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Patient } from '../../../../core/models/Patient.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  patientEndpoints = environment.endpoints.patient;
  constructor(private apiService: ApiService) {}
  login(email: string, password: string): Observable<string> {
    const body = { email: email, password: password };
    return this.apiService
      .post<{ token: string }>(`${this.patientEndpoints.login}`, body)
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
          console.error('Login error:', error);
          return throwError(() => new Error(`Login failed: ${error.message}`));
        })
      );
  }
  private storePatient(patient: Patient): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('patient', JSON.stringify(patient));
    }
  }
  getTocken(): string | null {
    return localStorage.getItem('token');
  }

  getPatientByToken(): Observable<Patient> {
    return this.apiService.get<Patient>(
      `${this.patientEndpoints.getpatientByToken}`
    );
  }
  logout(): Observable<string> {
    return this.apiService.post<string>(`${this.patientEndpoints.logout}`);
  }
}
