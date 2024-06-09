import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { environment } from '../../../../../enviroments/enviroment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Patient } from '../../../../core/models/Patient.model';
import { Employee } from '../../../../core/models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.hasToken());

  patientEndpoints = environment.endpoints.patient;

  employeeEndpoints = environment.endpoints.employee;
  constructor(private apiService: ApiService) { }


  login(email: string, password: string, usertype: string): Observable<string> {
    const body = { email: email, password: password };
    if (usertype == "patient") {
      return this.apiService.post<{ token: string }>(`${this.patientEndpoints.login}`, body).pipe(map((response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('status', 'logedin');
          localStorage.setItem('usertype', 'patient');
          this.isAuthenticatedSubject.next(true);
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
    else {
      return this.apiService.post<{ token: string }>(`${this.employeeEndpoints.login}`, body).pipe(map((response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('status', 'logedin');
          localStorage.setItem('usertype', 'employee');
          this.isAuthenticatedSubject.next(true);
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



  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private hasToken(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('token');
  }
  storePatient(patient: Patient): void {
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
  getEmployeeByToken() : Observable<Employee> {
    return this.apiService.get<Employee>(
      `${this.employeeEndpoints.getemployeeByToken}`
    );
  }
  logout(): Observable<string> {
    return this.apiService.post<string>(`${this.patientEndpoints.logout}`).pipe(
      map((response) => {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        console.log('Logout: user logged out, token removed, isAuthenticatedSubject set to false');
        return response;
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error(`Logout failed: ${error.message}`));
      })
    );
  }

  getusertype(): string | null {
    return localStorage.getItem('usertype');
  }







  isAuthenticated(): Observable<boolean> {
    console.log('LoginService: isAuthenticatedSubject value =', this.isAuthenticatedSubject.value); // Log current value
    return this.isAuthenticatedSubject.asObservable();
  }
  logoutemp(): Observable<string> {
    return this.apiService.post<string>(`${this.employeeEndpoints.logout}`);
    localStorage.removeItem('usertype');
    localStorage.removeItem('token');
  }
}
