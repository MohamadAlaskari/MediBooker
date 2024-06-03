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
  subscription = new Subscription();
  reservations: Reservation[] = [];
  selectedDate: string;

  times = [
    { hour: '08:30', status: true },
    { hour: '09:00', status: true },
    { hour: '09:30', status: false },
    { hour: '10:00', status: false },
    { hour: '10:30', status: true },
    { hour: '11:00', status: true },
    { hour: '11:30', status: true },
    { hour: '12:00', status: true },
  ];

  constructor(private appointmentsService: AppointmentsService) {
    this.selectedDate = this.getCurrentDate();
  }

  ngOnInit() {
    this.loadPatientReservations();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.value;
  }

  toggleStatus(time: { hour: string; status: boolean }): void {
    time.status = !time.status;
  }

  private loadPatientReservations() {
    this.subscription.add(
      this.appointmentsService.getPatientReservation().subscribe({
        next: (reservations: Reservation[]) => {
          this.reservations = reservations;
          console.log('Loading Patient reservations was successful');
        },
        error: (err) => {
          console.error(
            'An error occurred while fetching Patient Reservations',
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
        console.log(
          'Loading Appointments successfully',
          this.availableappointments
        );
      },
      error: (error) => {
        console.log('An error occurred while loading Appointments', error);
      },
    });
  }

  private loadAppointment(id: string) {
    this.appointmentsService.getAppointmentByID(id).subscribe({
      next: (appointment: Appointment) => {
        this.appointment = appointment;
        console.log('Loading Appointment successfully', this.appointment);
      },
      error: (error) => {
        console.log(
          'An error occurred while loading Appointment',
          error.error.error
        );
      },
    });
  }

  getAppointment(id: string): Appointment | null {
    this.loadAppointment(id);
    return this.appointment;
  }

  handleDateSelected(selectedDate: Date) {
    const formattedDate = this.formatDate(selectedDate);
    this.selectedDate = formattedDate;

    console.log('Selected Date:', formattedDate);
  }

  private getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }
}
