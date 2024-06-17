import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../../../core/models/Employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Employeeservice{
  employeesEndepoint = environment.endpoints.employee;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}


  getEmployees(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(
      `${this.employeesEndepoint.getAll}`
    );
  }


}
