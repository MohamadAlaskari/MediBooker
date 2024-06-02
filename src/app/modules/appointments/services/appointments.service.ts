import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../../../core/models/Appointment.model';
import { environment } from '../../../../enviroments/enviroment';
import { Reservation } from '../../../core/models/Reservation.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  appointmentsEndepoint = environment.endpoints.appointment;
  reservationEndepoints = environment.endpoints.reservation;
  constructor(private apiService: ApiService) {}

  getAppointments(): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(
      `${this.appointmentsEndepoint.getAll}`
    );
  }
  getPatientReservation(): Observable<Reservation[]> {
    return this.apiService.get<Reservation[]>(
      `${this.reservationEndepoints.getPatientReservations}`
    );
  }

  getAppointmentByID(id: String): Observable<Appointment> {
    return this.apiService.get<Appointment>(
      `${this.appointmentsEndepoint.getById}/${id}`
    );
  }

  getAppointmentByDate(date: Date): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(
      `${this.appointmentsEndepoint.getByDate}/${date}`
    );
  }
}
