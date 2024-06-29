import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { Service } from '../../../../core/models/Service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurservicesService {
  ServicesEndepoint = environment.endpoints.service;

  constructor(private apiService: ApiService) { }

  getServices(): Observable<Service[]> {
    return this.apiService.get<Service[]>(
      `${this.ServicesEndepoint.getAll}`
    );
  }


}
