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
  employeeEndpoints = environment.endpoints.employee;

  constructor(private apiService: ApiService) {}

  logout(): Observable<string> {
    return this.apiService.post<string>(`${this.patientEndpoints.logout}`);
    localStorage.removeItem('token');
  }


  isAuthenticated(): boolean {
    return localStorage.getItem('status') === 'loggedin';
  }

  updatepatient(Patient: Patient): Observable<Patient> {
    return this.apiService.put<Patient>(
      `${this.patientEndpoints.update}`,
      Patient
    );
  }
}
