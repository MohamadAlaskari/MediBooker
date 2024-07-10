import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Patient } from '../../../../core/models/Patient.model';
import { Reservation } from '../../../../core/models/Reservation.model';
import { Subscription } from 'rxjs';
import { PatientService } from '../../../../core/services/patient-service/patient.service';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../../../core/services/appointment-service/appointment.service';
import { WebSocketService } from '../../../../core/services/WebSocket/web-socketservice.service';
declare var bootstrap: any;

@Component({
  selector: 'app-patients-management',
  templateUrl: './patients-management.component.html',
  styleUrl: './patients-management.component.scss',
})
export class PatientsManagementComponent {
  searchTerm: string = '';
  Patients: Patient[] = [];
  reservations: Reservation[] = [];
  subscription = new Subscription();
  @ViewChild('Modal') Modal!: ElementRef;
  patientdetails: Patient | null = null;

  private patientarrayupdate: Subscription | null = null;


  constructor(
    private patientService: PatientService,
    private appointmentsService: AppointmentService,
    private renderer: Renderer2,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.getPatients();

    this.patientarrayupdate = this.webSocketService.onpatientupdate().subscribe(() => {
      this.getPatients();
    });
  }

  ngOnDestroy(): void {
    if (this.patientarrayupdate) {
      this.patientarrayupdate.unsubscribe();
    }
  }


  getPatients() {
    this.patientService.getPatients().subscribe({
      next: (patients: Patient[]) => {
        this.Patients = patients;
        console.log('Loading all Patients successfully', this.Patients);
      },
      error: (error) => {
        this.Patients = [];
        console.error('An error occurred while loading all Patients', error);
      },
    });
  }

  addPatient() {}

  removePatient(index: any) {
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
        this.deletepatient(index);
      }
    });
  }

  deletepatient(userId: string): void {
    this.patientService.deletePatient(userId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Patient has been deleted.',
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

  filteredPatients() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.Patients.filter(
      (patient) =>
        patient.name.toLowerCase().startsWith(searchTermLower) ||
        patient.surname.toLowerCase().startsWith(searchTermLower) ||
        patient.email.toLowerCase().startsWith(searchTermLower) ||
        patient.city.toLowerCase().startsWith(searchTermLower) ||
        patient.healthInsurance.toLowerCase().startsWith(searchTermLower) ||
        patient.phoneNr.toLowerCase().startsWith(searchTermLower)
    );
  }

  // Tooltip methods
  showTooltip(event: MouseEvent, tooltips: { label: string; value: string }[]) {
    const tooltipElement = this.renderer.createElement('div');
    tooltipElement.className = 'custom-tooltip';

    // Construct tooltip content
    tooltips.forEach((info) => {
      const p = this.renderer.createElement('p');
      p.textContent = `${info.label}: ${info.value}`;
      this.renderer.appendChild(tooltipElement, p);
    });

    // Position the tooltip relative to the mouse cursor
    const mouseX = event.clientX + window.scrollX;
    const mouseY = event.clientY + window.scrollY;
    this.renderer.setStyle(tooltipElement, 'top', mouseY + 'px');
    this.renderer.setStyle(tooltipElement, 'left', mouseX + 'px');

    this.renderer.appendChild(document.body, tooltipElement);
  }

  hideTooltip() {
    const tooltipElement = document.querySelector('.custom-tooltip');
    if (tooltipElement) {
      this.renderer.removeChild(document.body, tooltipElement);
    }
  }
  openModal(patient: Patient): void {
    this.patientdetails = patient;

    this.loadpatientreservations(patient.id);

    const modalElement = this.Modal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
  formatHour(hourString: string): string {
    // Split the hourString by ':' and take the first two elements
    const [hour, minute] = hourString.split(':').slice(0, 2);
    return `${hour}:${minute}`;
  }
  loadpatientreservations(id: number) {
    this.subscription.add(
      this.appointmentsService.loadpatientreservationsbyid(id).subscribe({
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
}
