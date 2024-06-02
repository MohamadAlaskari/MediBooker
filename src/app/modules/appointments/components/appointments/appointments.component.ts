import { Component } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../core/models/Reservation.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
  appointments: Appointment[] = [];
  availableappointments: Appointment[] = [];
  appointment: Appointment | null = null;
  subscribtion = new Subscription();
  reservations: Reservation[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.loadPatientReservations();
  }
  private loadPatientReservations() {
    this.subscribtion.add(
      this.appointmentsService.getPatientReservation().subscribe({
        next: (reservations: Reservation[]) => {
          this.reservations = reservations;
          console.log('Loading Patients reservations was Sucsessfully');
        },
        error: (err) => {
          console.error(
            'An error occured while fetchting Patient Reservations ',
            err
          );
        },
      })
    );
  }

  private loadAppointmentbydate(date: Date) {
    this.appointmentsService.getAppointmentByDate(date).subscribe({
      next: (availableappointments: Appointment[]) => {
        this.availableappointments = availableappointments;
        console.log(' loading Appointments successfully', this.appointments);
      },
      error: (error) => {
        console.log('an error occur by loading Appointments', error);
      },
    });
  }
  private loadAppointment(id: string) {
    this.appointmentsService.getAppointmentByID(id).subscribe({
      next: (appointment: Appointment) => {
        this.appointment = appointment;
        console.log(' loading Appointments successfully', this.appointments);
      },
      error: (error) => {
        console.log('an error occur by loading Appointments', error);
      },
    });
  }

  getAppointment(id: string): Appointment | null {
    this.loadAppointment(id);
    return this.appointment;
  }
}
