import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../../../core/models/Patient.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  PatientsEndepoint = environment.endpoints.patient;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}


  getPatients(): Observable<Patient[]> {
    return this.apiService.get<Patient[]>(
      `${this.PatientsEndepoint.getAll}`
    );
  }
}
