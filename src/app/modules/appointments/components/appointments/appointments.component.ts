import { Component } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../core/models/Reservation.model';
import { OurservicesService } from '../../../home/services/ourservices/ourservices.service';
import { Service } from '../../../../core/models/Service.model';
import { DatePipe } from '@angular/common';
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
  appointmentsbydate: Appointment[] = [];
  selectedDate: string;
  selectedtime: string | null = null;
  selectedService: any;
  description: string | null = null;
  selectedAppointments: boolean[] = [];
  services: Service[] = [];
  isActive: number | null = null;
  selcAppointment: Appointment | null = null;

  times = [
    { hour: '08:30', selected: false, disabled: true },
    { hour: '09:00', selected: false, disabled: true },
    { hour: '09:30', selected: false, disabled: false },
    { hour: '10:00', selected: false, disabled: true },
    { hour: '10:30', selected: false, disabled: false },
    { hour: '11:00', selected: false, disabled: true },
    { hour: '11:30', selected: false, disabled: false },
    { hour: '12:00', selected: false, disabled: true },
  ];

  constructor(private appointmentsService: AppointmentsService, private ourservices: OurservicesService,private datePipe: DatePipe) {
    this.selectedDate = this.getCurrentDate();
    this.selectedAppointments = this.availableappointments.map(_ => false);
  }

  ngOnInit() {
    this.loadPatientReservations();
    this.loadservices();
    const formattedDate = new Date(this.selectedDate);

    console.log("init",this.selectedDate)
  }

  handleDateSelected(selectedDate: Date) {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
      console.error('Invalid date selected:', selectedDate);
      return;
    }

    this.selectedDate = this.formatDate(selectedDate);
    console.log(this.selectedDate)
    // Assuming this method formats the date for display purposes
    this.loadAppointmentbydate(selectedDate); // Pass the valid Date object
  }
  loadservices() {
    this.subscription.add(
      this.ourservices.getServices().subscribe({
        next: (services: Service[]) => {
          this.services = services;
          console.log('Loading services  was successful', this.services);
        },
        error: (err) => {
          console.error(
            'An error occurred while fetching services',
            err
          );
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.value;
  }
  handleCheckboxClick(appointment: Appointment) {
    if (!appointment.status) {
        const index = this.availableappointments.findIndex(appt => appt === appointment);
        if (this.selcAppointment === appointment) {
            // If the clicked appointment is already selected, deselect it
            this.selcAppointment = null;
            console.log("Time deselected:", appointment.hour);
        } else {
            // Deselect the previously selected appointment
            this.selcAppointment = appointment;
            console.log("Time selected:", this.selcAppointment.hour);
        }
        // Update the selectedAppointments array based on the checkbox state
        this.selectedAppointments[index] = !this.selectedAppointments[index];
    }
}
isSelected(appointment: Appointment): boolean {
  return this.selcAppointment === appointment;
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
    console.log("final",date);
    this.appointmentsService.getAppointmentByDate(date).subscribe({
      next: (availableappointments: Appointment[]) => {
        this.availableappointments = availableappointments;
        console.log('Loading Appointments successfully', this.availableappointments);
      },
      error: (error) => {
        console.error('An error occurred while loading Appointments', error);
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



  private getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }
  formatHour(hourString: string ): string {
    // Split the hourString by ':' and take the first two elements
    const [hour, minute] = hourString.split(':').slice(0, 2);
    return `${hour}:${minute}`;
  }
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  makeappointment() {
    console.log("", this.selcAppointment?.id, this.selectedDate);
    console.log('Selected Service:', this.selectedService);
    console.log('Description:', this.description)

    let id: number | undefined;

    if (this.selcAppointment != null) {
      id = this.selcAppointment.id;
    } else {
      console.error('Error: selcAppointment is null');
      return; // or handle the error in an appropriate way
    }

    this.appointmentsService.createreservation(id, this.selectedService).subscribe({
      next: (response) => {
        console.log(' success', response);
        window.location.reload();
      },
      error(error) {
        console.log('error', error);
      },
    });







  }
}
