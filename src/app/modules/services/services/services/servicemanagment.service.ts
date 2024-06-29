import { Injectable } from '@angular/core';
import { Service } from '../../../../core/models/Service.model';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  }
  deleteservice(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.apiService.delete<string>(`${this.ServicesEndepoint.delete}?${params.toString()}`);
  }


  addservice(type: string,description: string): Observable<Service> {
    const body = {
      type: type,
      description: description
    };
    return this.apiService.post<Service>(`${this.ServicesEndepoint.create}`, body);
  }


  updateservice(id : number ,type: string,description: string): Observable<Service> {
    const params = new HttpParams().set('id', id);
    const body = {
      type: type,
      description: description,

    };
    return this.apiService.put<Service>(`${this.ServicesEndepoint.update}?${params.toString()}`,body);

  }






}
