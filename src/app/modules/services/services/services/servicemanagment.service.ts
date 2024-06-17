import { Injectable } from '@angular/core';
import { Service } from '../../../../core/models/Service.model';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicemanagmentService {


  ServicesEndepoint = environment.endpoints.service;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}


  getServices(): Observable<Service[]> {
    return this.apiService.get<Service[]>(
      `${this.ServicesEndepoint.getAll}`
    );
  }}
