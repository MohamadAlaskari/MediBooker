import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../../../core/models/Appointment.model';
import { environment } from '../../../../enviroments/enviroment';
import { Reservation } from '../../../core/models/Reservation.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {

  appointmentsEndepoint = environment.endpoints.appointment;
  reservationEndepoints = environment.endpoints.reservation;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}

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

  getAppointmentByID(id: string): Observable<Appointment> {
    return this.apiService.get<Appointment>(
      `${this.appointmentsEndepoint.getById}/${id}`
    );
  }

  getAppointmentByDate(date: Date): Observable<Appointment[]> {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date passed to getAppointmentByDate:', date);
      throw new Error('Invalid date');
    }

    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

    const formattedDate = localDate.toISOString().split('T')[0];

    console.log("formattedDatefinal", formattedDate);

    const params = new HttpParams().set('date', formattedDate);

    const endpoint = `${environment.apiBaseUrl}${this.appointmentsEndepoint.getByDate}`;

    return this.httpClient.get<Appointment[]>(endpoint, { params });
}




  createreservation(appointmentId: number, serviceId: string): Observable<Reservation> {
    const body = {
      appointmentId: appointmentId,
      serviceId: serviceId
    };
    return this.apiService.post<Reservation>(`${this.reservationEndepoints.create}`, body);
  }
}
