import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../../../core/models/Reservation.model';
import { AppointmentsService } from '../../../modules/appointments/services/appointments.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  reservations: Reservation[] = [];
  subscription = new Subscription();
  islogedin: boolean = false;
  subscribtion = new Subscription();
  nearestReservation: Reservation | null = null;
  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  private countdownInterval: any;
  appointmentTodayMessage: string = '';

  constructor(private appointmentsService: AppointmentsService, private loginService: LoginService) {}

  ngOnInit() {
    this.subscribtion.add(
      this.loginService.isAuthenticated().subscribe((isAuthenticated) => {
        this.islogedin = isAuthenticated;
        if (isAuthenticated) {
          this.loadPatientReservations();
        } else {
          this.islogedin = false;
        }
      })
    );
  }

  private loadPatientReservations() {
    this.subscription.add(
      this.appointmentsService.getPatientReservation().subscribe({
        next: (reservations: Reservation[]) => {
          this.reservations = reservations;
          console.log('Loading Patient reservations was successful',reservations);
          this.findNearestReservation();
        },
        error: (err) => {
          console.error('An error occurred while fetching Patient Reservations', err);
        },
      })
    );
  }
  private findNearestReservation() {
    console.log('All reservations:', this.reservations);

    const now = new Date();
    console.log('Current date:', now);

    let nearestAppointment: Date | null = null;

    this.reservations.forEach(reservation => {
        if (reservation.Appointment) {
            const appointmentDate = new Date(reservation.Appointment.date);
            const [hours, minutes, seconds] = reservation.Appointment.hour.split(':').map(Number);
            appointmentDate.setHours(hours, minutes, seconds || 0);

            if (appointmentDate >= now && (!nearestAppointment || appointmentDate < nearestAppointment)) {
                nearestAppointment = appointmentDate;
                this.nearestReservation = reservation;
            }
        }
    });

    if (this.nearestReservation) {
        console.log('Nearest reservation found:', this.nearestReservation);
        this.checkIfAppointmentIsToday();
        this.startCountdown();
    } else {
        console.log('No upcoming reservations found');
    }
}





private isSameDay(date1: Date, date2: Date): boolean {
  console.log('Date 1:', date1);
  console.log('Date 2:', date2);
  return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  );
}




  private checkIfAppointmentIsToday() {
    if (!this.nearestReservation || !this.nearestReservation.Appointment) return;

    const appointmentDate = new Date(this.nearestReservation.Appointment.date);
    const today = new Date();

    console.log('Appointment date:', appointmentDate);
    console.log('Today\'s date:', today);

    // Normalize the dates to remove the time component
    const appointmentDateOnly = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    console.log('Normalized appointment date:', appointmentDateOnly);
    console.log('Normalized today\'s date:', todayDateOnly);

    // Check if the appointment is today
    if (appointmentDateOnly.getTime() === todayDateOnly.getTime()) {
      this.appointmentTodayMessage = 'Your Appointment is today!';
      console.log(this.appointmentTodayMessage);
    } else {
      this.appointmentTodayMessage = '';
      console.log('Appointment is not today');
    }
  }

  private startCountdown() {
    if (!this.nearestReservation || !this.nearestReservation.Appointment) return;

    const appointmentDate = new Date(this.nearestReservation.Appointment.date);
    const [hours, minutes, seconds] = this.nearestReservation.Appointment.hour.split(':').map(Number);

    const appointmentDateTime = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      hours,
      minutes,
      seconds || 0
    );

    console.log('Combined appointment date and time:', appointmentDateTime);

    this.updateCountdown(appointmentDateTime);

    this.countdownInterval = setInterval(() => {
      this.updateCountdown(appointmentDateTime);
    }, 1000);
}

  private updateCountdown(targetDate: Date) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      clearInterval(this.countdownInterval);
      this.countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      return;
    }

    this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
