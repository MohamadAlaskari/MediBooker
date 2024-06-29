import { Component } from '@angular/core';
import { Appointment } from '../../../../core/models/Appointment.model';
import { AppointmentsService } from '../../services/appointments.service';
import { OurservicesService } from '../../../home/services/ourservices/ourservices.service';
import { Service } from '../../../../core/models/Service.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastNotificationsService } from '../../../../shared/services/toast-notifications/toast-notifications.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.scss',
})
export class AddAppointmentComponent {
  selectedDate: string;
  availableappointments: Appointment[] = [];
  selectedAppointments: boolean[] = [];
  selcAppointment: Appointment | null = null;
  selectedService: any;
  description: string | null = null;
  services: Service[] = [];
  subscription = new Subscription();

  constructor(
    private appointmentsService: AppointmentsService,
    private ourservices: OurservicesService,
    private router: Router,
    private toastService: ToastNotificationsService
  ) {
    this.selectedDate = this.getCurrentDate();
    this.selectedAppointments = this.availableappointments.map((_) => false);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadservices();
    this.toastService.showInfo('Please Select the DATE')

  }
  handleDateSelected(selectedDate: Date) {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
      console.error('Invalid date selected:', selectedDate);
      return;
    }

    this.selectedDate = this.formatDate(selectedDate);
    console.log(this.selectedDate);
    // Assuming this method formats the date for display purposes
    this.loadAppointmentbydate(selectedDate); // Pass the valid Date object
  }
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }
  private getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  //
  private loadAppointmentbydate(date: Date) {
    console.log('final', date);
    this.appointmentsService.getAppointmentByDate(date).subscribe({
      next: (availableappointments: Appointment[]) => {
        this.availableappointments = availableappointments;
        console.log(
          'Loading Appointments successfully',
          this.availableappointments
        );
        //this.applyFilterAndSort(); // Call applyFilterAndSort here
      },
      error: (error) => {
        this.availableappointments = [];
        //   this.paginatedAppointments = [];
        // this.filteredAppointments = [];
        console.error('An error occurred while loading Appointments', error);
      },
    });
  }

  isSelected(appointment: Appointment): boolean {
    return this.selcAppointment === appointment;
  }

  isPastAppointment(date: any, hourString: string): boolean {
    // Ensure the date is a Date object
    const appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      console.error('Invalid date:', date);
      return false;
    }

    const today = new Date();

    const isSameDay =
      appointmentDate.getFullYear() === today.getFullYear() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getDate() === today.getDate();

    if (isSameDay) {
      const [hour, minute] = hourString.split(':').map(Number);
      const appointmentTime = new Date();
      appointmentTime.setHours(hour, minute, 0, 0);

      const now = new Date();
      return appointmentTime < now;
    }

    return false;
  }

  handleCheckboxClick(appointment: Appointment) {
    if (!appointment.status) {
      const index = this.availableappointments.findIndex(
        (appt) => appt === appointment
      );
      if (this.selcAppointment === appointment) {
        // If the clicked appointment is already selected, deselect it
        this.selcAppointment = null;
        console.log('Time deselected:', appointment.hour);
      } else {
        // Deselect the previously selected appointment
        this.selcAppointment = appointment;
        console.log('Time selected:', this.selcAppointment.hour);
      }
      // Update the selectedAppointments array based on the checkbox state
      this.selectedAppointments[index] = !this.selectedAppointments[index];
    }
  }
  formatHour(hourString: string): string {
    // Split the hourString by ':' and take the first two elements
    const [hour, minute] = hourString.split(':').slice(0, 2);
    return `${hour}:${minute}`;
  }
  makeappointment() {
    console.log('', this.selcAppointment?.id, this.selectedDate);
    console.log('Selected Service:', this.selectedService);
    console.log('Description:', this.description);

    let id: number | undefined;

    if (this.selcAppointment != null) {
      id = this.selcAppointment.id;
    } else {
      console.error('Error: selcAppointment is null');
      return; // or handle the error in an appropriate way
    }

    this.appointmentsService
      .createreservation(id, this.selectedService)
      .subscribe({
        next: (response) => {
          console.log(' success', response);
          this.toastService.showSuccess('Appointment created successfully');
          this.router.navigate(['/appointments']);
        },
        error: (err) => {
          this.toastService.showError('Error creating appointment')

          console.error('Error creating appointment:', err);
        },
      });
  }

  loadservices() {
    this.subscription.add(
      this.ourservices.getServices().subscribe({
        next: (services: Service[]) => {
          this.services = services;
          console.log('Loading services  was successful', this.services);
        },
        error: (err) => {
          console.error('An error occurred while fetching services', err);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
