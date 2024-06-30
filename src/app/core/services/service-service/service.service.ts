import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../models/Service.model';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  ServicesEndepoint = environment.endpoints.service;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}
 
  getServices(): Observable<Service[]> {
    return this.apiService.get<Service[]>(`${this.ServicesEndepoint.getAll}`);
  }
  deleteservice(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.apiService.delete<string>(
      `${this.ServicesEndepoint.delete}?${params.toString()}`
    );
  }

  addservice(type: string, description: string): Observable<Service> {
    const body = {
      type: type,
      description: description,
    };
    return this.apiService.post<Service>(
      `${this.ServicesEndepoint.create}`,
      body
    );
  }

  updateservice(
    id: number,
    type: string,
    description: string
  ): Observable<Service> {
    const params = new HttpParams().set('id', id);
    const body = {
      type: type,
      description: description,
    };
    return this.apiService.put<Service>(
      `${this.ServicesEndepoint.update}?${params.toString()}`,
      body
    );
  }
}
