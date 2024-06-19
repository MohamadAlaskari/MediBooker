import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../core/models/Reservation.model';
import { OurservicesService } from '../../../home/services/ourservices/ourservices.service';
import { Service } from '../../../../core/models/Service.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/services/login-service/login.service';
declare var bootstrap: any;

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
  @ViewChild('Modal') Modal!: ElementRef;


  appointments: Appointment[] = [];
  availableappointments: Appointment[] = [];
  appointment: Appointment | null = null;
  countdown: string = "";
  subscription = new Subscription();
  reservations: Reservation[] = [];
  appointmentsbydate: Appointment[] = [];

  selectedDate: string;
  selectedtime: string | null = null;
  reservationdetails : Reservation | null = null;

  selectedService: any;
  description: string | null = null;
  selectedAppointments: boolean[] = [];
  services: Service[] = [];
  isActive: number | null = null;
  selcAppointment: Appointment | null = null;
  usertype: string | null = null;
  private intervalId: any;


  constructor(private appointmentsService: AppointmentsService, private ourservices: OurservicesService, private datePipe: DatePipe, private loginService: LoginService,) {
    this.selectedDate = this.getCurrentDate();
    this.selectedAppointments = this.availableappointments.map(_ => false);
  }

  ngOnInit() {
    const today = new Date();
    this.loadAppointmentbydate(today);
    this.usertype = localStorage.getItem('usertype');
    if (this.usertype == "patient") {
      this.loadPatientReservations();
      this.loadservices();

    }
    else if (this.usertype == "employee") {

    }

  }









  enforceMinimumValue(appointment: any) {
    if (appointment.min < 10) {
      appointment.min = 10; // Set it to 10 if it's less than 10
    }
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
    console.log("final", date);
    this.appointmentsService.getAppointmentByDate(date).subscribe({
      next: (availableappointments: Appointment[]) => {
        this.availableappointments = availableappointments;
        console.log('Loading Appointments successfully', this.availableappointments);
      },
      error: (error) => {
        this.availableappointments = [];
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
  isPastAppointment(date: any, hourString: string): boolean {
    // Ensure the date is a Date object
    const appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      console.error('Invalid date:', date);
      return false;
    }

    const today = new Date();

    const isSameDay = appointmentDate.getFullYear() === today.getFullYear() &&
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

  private getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }
  formatHour(hourString: string): string {
    // Split the hourString by ':' and take the first two elements
    const [hour, minute] = hourString.split(':').slice(0, 2);
    return `${hour}:${minute}`;
  }
   formatDate(date: Date): string {
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
  deletereservation(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelreservation(id);
      }
    });
  }

  cancelreservation(id: string) {

    this.appointmentsService.deletereservation(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Deleted!",
          text: "Your Appointment has been cancled.",
          icon: "success"
        });
        window.location.reload();
      },
      error(error) {
        console.log('error', error);
      },
    });


  }
  openModal(appointment: Appointment): void {
    if (appointment.status === true) {
      this.appointmentsService.getreservationByAppointment(appointment.id).subscribe({
        next: (reservationdetails: Reservation) => {
          this.reservationdetails = reservationdetails;
          console.log('Loading reservation details successfully', this.reservationdetails);

          if (this.reservationdetails?.Appointment?.date && this.reservationdetails?.Appointment?.hour) {
            this.startCountdown(this.reservationdetails.Appointment.date, this.reservationdetails.Appointment.hour);
            this.intervalId = setInterval(() => {
              this.startCountdown(this.reservationdetails!.Appointment!.date, this.reservationdetails!.Appointment!.hour);
            }, 1000);
          }

          const modalElement = this.Modal.nativeElement;
          const bootstrapModal = new bootstrap.Modal(modalElement);
          bootstrapModal.show();
        },
        error: (error) => {
          console.log('An error occurred while loading appointment', error.error.error);
        }
      });
    }
  }


  startCountdown(date: Date, hour: string): void {
    if (!date || !hour) {
      this.countdown = 'Invalid date or time!';
      return;
    }

    const appointmentDate = new Date(date);
    const [hours, minutes, seconds] = hour.split(':').map(Number);
    appointmentDate.setHours(hours, minutes, seconds);

    const now = new Date();
    const timeDifference = appointmentDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      this.countdown = 'The  appointment time has already passed.!';
      clearInterval(this.intervalId);
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      this.countdown = `Appointment after: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

}
