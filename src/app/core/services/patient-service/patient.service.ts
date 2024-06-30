import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../models/Patient.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  PatientsEndepoint = environment.endpoints.patient;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.apiService.get<Patient[]>(`${this.PatientsEndepoint.getAll}`);
  }

  deletePatient(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.apiService.delete<string>(
      `${this.PatientsEndepoint.delete}?${params.toString()}`
    );
  }
}
