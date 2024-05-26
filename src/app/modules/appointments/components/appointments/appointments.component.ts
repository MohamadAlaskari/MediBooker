import { Component } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../../../core/models/Appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
  appointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  private loadAppointments() {
    this.appointmentsService.getAppointments().subscribe({
      next: (response) => {
        this.appointments = response;
        console.log(' loading Appointments successfully', this.appointments);
      },
      error: (error) => {
        console.log('an error occur by loading Appointments', error);
      },
    });
  }
}
