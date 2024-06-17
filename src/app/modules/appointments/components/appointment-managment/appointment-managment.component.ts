import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../core/models/Appointment.model';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointment-managment',
  templateUrl: './appointment-managment.component.html',
  styleUrl: './appointment-managment.component.scss'
})
export class AppointmentManagmentComponent {
  bsValue = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  minDate = new Date();
  showAppointmentsForm: boolean = true;
  starttime : string  = "";
  endtime : string = "";
  Duration : string = "";
  fromtoday: string | null = null;
  availableTimes: string[] = [];
  allappointments: Appointment[] = [];
  disabledDates: Date[] = [];
  appointmentsData: any[] = [{ date: '', start: '', end: '', min: 10 }];
  dateRange: Date[];
  constructor(private appointmentsService: AppointmentsService) {
    this.dateRange = [new Date(), new Date()];
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      isAnimated: true,
      showWeekNumbers: false
    };

    this.minDate.setDate(this.minDate.getDate());
  }
  ngOnInit() {

    const startHour = 7;
    const endHour = 21;
    for (let hour = startHour; hour <= endHour; hour++) {
      this.availableTimes.push(`${this.padTime(hour)}:00`);
      this.availableTimes.push(`${this.padTime(hour)}:30`);
    }
    this.getAppointments();
  }
  padTime(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
  createForDateRange() {
    const dateStart = this.dateRange[0].toISOString().split('T')[0];
    const dateEnd = this.dateRange[1].toISOString().split('T')[0];

    this.appointmentsService.createForDateRange(dateStart, dateEnd, this.Duration, this.starttime, this.endtime)
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
          window.location.reload(); // Example: Reload page on success
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
  getAppointments() {
    this.appointmentsService.getAppointments().subscribe({
      next: (allappointments: Appointment[]) => {
        this.allappointments = allappointments;
        console.log('Loading all Appointments successfully', this.allappointments);

        this.calculateDisabledDates();
      },
      error: (error) => {
        this.allappointments = [];
        console.error('An error occurred while loading all Appointments', error);
      },
    });
  }

  calculateDisabledDates() {
    const appointmentsCount: { [key: string]: number } = {};

    // Count appointments for each date
    this.allappointments.forEach(appointment => {
      const date = new Date(appointment.date); // Assuming appointment.date is already a valid date string or Date object

      if (!isNaN(date.getTime())) { // Check if date is valid
        const formattedDate = date.toISOString().slice(0, 10); // Format date to YYYY-MM-DD

        if (!appointmentsCount[formattedDate]) {
          appointmentsCount[formattedDate] = 0;
        }
        appointmentsCount[formattedDate]++;
      }
    });

    console.log('Appointments Count:', appointmentsCount);

    // Check for dates with more than 3 appointments
    for (const dateStr in appointmentsCount) {
      if (appointmentsCount.hasOwnProperty(dateStr)) {
        const count = appointmentsCount[dateStr];
        console.log(`Date: ${dateStr}, Count: ${count}`);

        if (count > 3) {
          const dateParts = dateStr.split('-').map(Number); // Split the date string into parts
          const year = dateParts[0];
          const month = dateParts[1] - 1; // Months are zero-indexed in JavaScript Date objects
          const day = dateParts[2];
          const dateObj = new Date(year, month, day); // Create Date object from year, month, day

          this.disabledDates.push(dateObj);
        }
      }
    }

    console.log('Disabled Dates:', this.disabledDates); // Verify disabled dates
  }

  onSubmit() {
    if (this.appointmentsData.every(app => app.date && app.start && app.end && app.min > 0)) {
      this.appointmentsService.createMultipleAppointments(this.appointmentsData).subscribe({
        next: (response) => {
          console.log(' success', response);
          window.location.reload();
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  addAppointment() {
    this.appointmentsData.push({ date: '', start: '', end: '', min: null });
  }

  removeAppointment(index: number) {
    this.appointmentsData.splice(index, 1);
  }
  enforceMinimumValue(appointment: any) {
    if (appointment.min < 10) {
      appointment.min = 10; // Set it to 10 if it's less than 10
    }
  }
}
