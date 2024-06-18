import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { ApiService } from '../../../../core/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../../../../core/models/Employee.model';
import { Observable, catchError, map, throwError } from 'rxjs';

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
  deleteemployee(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.apiService.delete<string>(`${this.employeesEndepoint.delete}?${params.toString()}`);
  }


  addemployee(name: string,surname: string,email: string,password: string,street: string,hNr: string,postcode: string,city: string): Observable<Employee> {
    const body = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      street: street,
      hNr: hNr,
      postcode: postcode,
      city: city,
    };
    return this.apiService.post<Employee>(`${this.employeesEndepoint.signup}`, body);
  }
}
