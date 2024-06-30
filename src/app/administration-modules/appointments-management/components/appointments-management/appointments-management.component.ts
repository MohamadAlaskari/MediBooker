import { Component, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Appointment } from '../../../../core/models/Appointment.model';
import { AppointmentService } from '../../../../core/services/appointment-service/appointment.service';
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../core/models/Reservation.model';
import { ServiceService } from '../../../../core/services/service-service/service.service';
import { Service } from '../../../../core/models/Service.model';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-appointments-management',
  templateUrl: './appointments-management.component.html',
  styleUrl: './appointments-management.component.scss',
})
export class AppointmentsManagementComponent {
  bsValue = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  minDate = new Date();
  showAppointmentsForm: boolean = true;
  starttime: string = '';
  endtime: string = '';
  Duration: number = 10;
  fromtoday: string | null = null;
  availableTimes: string[] = [];
  allappointments: Appointment[] = [];
  disabledDates: Date[] = [];
  appointmentsData: any[] = [{ date: '', start: '', end: '', min: 10 }];
  dateRange: Date[];

  //tabele sachen
  selectedDate: string;
  usertype: string | null = null;
  subscription = new Subscription();
  reservations: Reservation[] = [];
  services: Service[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  statusFilter: string = '';
  sortOrder: string = 'asc';
  filteredAppointments: Appointment[] = [];
  paginatedAppointments: Appointment[] = [];
  availableappointments: Appointment[] = [];
  @ViewChild('Modal') Modal!: ElementRef;
  reservationdetails: Reservation | null = null;
  private intervalId: any;
  countdown: string = '';

  constructor(
    private appointmentsService: AppointmentService,
    private ourservices: ServiceService
  ) {
    this.dateRange = [new Date(), new Date()];
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      isAnimated: true,
      showWeekNumbers: false,
    };

    this.minDate.setDate(this.minDate.getDate());

    this.selectedDate = this.getCurrentDate();
  }
  ngOnInit() {
    const startHour = 7;
    const endHour = 21;
    for (let hour = startHour; hour <= endHour; hour++) {
      this.availableTimes.push(`${this.padTime(hour)}:00`);
      this.availableTimes.push(`${this.padTime(hour)}:30`);
    }
    this.getAppointments();

    //table sachen
    this.usertype = localStorage.getItem('usertype');
    if (this.usertype == 'patient') {
      this.loadPatientReservations();
      this.loadservices();
    } else if (this.usertype == 'admin') {
      // Apply filter and sort for employees
      this.applyFilterAndSort();
    }
  }
  padTime(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
  checkDisabledDates(dateRange: Date[]): boolean {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    const disabledDates = this.disabledDates; // assuming this is your disabledDates array

    for (const disabledDate of disabledDates) {
      if (disabledDate >= startDate && disabledDate <= endDate) {
        return true;
      }
    }

    return false; // no disabled dates found within the range
  }
  createForDateRange() {
    if (!this.checkDisabledDates(this.dateRange)) {
      const dateStart = this.dateRange[0].toISOString().split('T')[0];
      const dateEnd = this.dateRange[1].toISOString().split('T')[0];

      this.appointmentsService
        .createForDateRange(
          dateStart,
          dateEnd,
          this.Duration,
          this.starttime,
          this.endtime
        )
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            window.location.reload(); // Example: Reload page on success
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    }
  }
  getAppointments() {
    this.appointmentsService.getAppointments().subscribe({
      next: (allappointments: Appointment[]) => {
        this.allappointments = allappointments;
        console.log(
          'Loading all Appointments successfully',
          this.allappointments
        );

        this.calculateDisabledDates();
      },
      error: (error) => {
        this.allappointments = [];
        console.error(
          'An error occurred while loading all Appointments',
          error
        );
      },
    });
  }

  calculateDisabledDates() {
    const appointmentsCount: { [key: string]: number } = {};

    // Count appointments for each date
    this.allappointments.forEach((appointment) => {
      const date = new Date(appointment.date); // Assuming appointment.date is already a valid date string or Date object

      if (!isNaN(date.getTime())) {
        // Check if date is valid
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

        if (count > 10) {
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
    if (
      this.appointmentsData.every(
        (app) => app.date && app.start && app.end && app.min > 0
      )
    ) {
      this.appointmentsService
        .createMultipleAppointments(this.appointmentsData)
        .subscribe({
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

  enforceMinimum() {
    if (this.Duration < 10) {
      this.Duration = 10;
    }
  }

  //table sachen
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

  applyFilterAndSort() {
    this.filteredAppointments = this.availableappointments;

    if (this.statusFilter) {
      this.filteredAppointments = this.filteredAppointments.filter(
        (appointment) =>
          (this.statusFilter === 'reserviert' && appointment.status) ||
          (this.statusFilter === 'nicht reserviert' && !appointment.status)
      );
    }

    this.filteredAppointments = this.filteredAppointments.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.hour.localeCompare(b.hour);
      } else {
        return b.hour.localeCompare(a.hour);
      }
    });

    this.paginateAppointments(); // Ensure pagination is applied after filtering and sorting
  }
  paginateAppointments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAppointments = this.filteredAppointments.slice(
      startIndex,
      endIndex
    );
  }
  openModal(appointment: Appointment): void {
    if (appointment.status === true) {
      this.appointmentsService
        .getreservationByAppointment(appointment.id)
        .subscribe({
          next: (reservationdetails: Reservation) => {
            this.reservationdetails = reservationdetails;
            console.log(
              'Loading reservation details successfully',
              this.reservationdetails
            );

            if (
              this.reservationdetails?.Appointment?.date &&
              this.reservationdetails?.Appointment?.hour
            ) {
              this.startCountdown(
                this.reservationdetails.Appointment.date,
                this.reservationdetails.Appointment.hour
              );
              this.intervalId = setInterval(() => {
                this.startCountdown(
                  this.reservationdetails!.Appointment!.date,
                  this.reservationdetails!.Appointment!.hour
                );
              }, 1000);
            }

            const modalElement = this.Modal.nativeElement;
            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.show();
          },
          error: (error) => {
            console.log(
              'An error occurred while loading appointment',
              error.error.error
            );
          },
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
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      this.countdown = `Appointment after: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateAppointments(); // Update pagination when page changes
  }

  get totalPages() {
    return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }

  get pages() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    return this.currentPage === this.totalPages;
  }

  removeappointment(index: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteappointment(index);
      }
    });
  }
  deleteappointment(id: string): void {
    this.appointmentsService.deleteappointment(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Appointment has been deleted.',
          icon: 'success',
        });
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }
}
