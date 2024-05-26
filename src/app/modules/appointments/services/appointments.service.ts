import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../../../core/models/Appointment.model';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  appointmentsEndepoint = environment.endpoints.appointment;
  constructor(private apiService: ApiService) {}

  getAppointments(): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(
      `${this.appointmentsEndepoint.getAll}`
    );
  }
}
