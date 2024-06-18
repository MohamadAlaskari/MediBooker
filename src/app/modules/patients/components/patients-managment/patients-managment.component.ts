import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { PatientService } from '../../services/patients/patientservices.service';
import { Patient } from '../../../../core/models/Patient.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients-managment',
  templateUrl: './patients-managment.component.html',
  styleUrls: ['./patients-managment.component.scss']
})
export class PatientsManagmentComponent {
  @ViewChild('addPatientModal', { static: false }) addPatientModal!: ElementRef;
  searchTerm: string = '';
  Patients: Patient[] = [];


  constructor(
    private patientService: PatientService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.getPatients();
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

  addPatient() {

  }

  removePatient(index: any) {
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

       this.deletepatient(index);

      }
    });
  }

  deletepatient(userId: string): void {
    this.patientService.deletePatient(userId).subscribe({
      next: () => {
        Swal.fire({
          title: "Deleted!",
          text: "Patient has been deleted.",
          icon: "success"
        });
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      },
    });
  }


  filteredPatients() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.Patients.filter(patient =>
      patient.name.toLowerCase().startsWith(searchTermLower) ||
      patient.surname.toLowerCase().startsWith(searchTermLower) ||
      patient.email.toLowerCase().startsWith(searchTermLower) ||
      patient.city.toLowerCase().startsWith(searchTermLower) ||
      patient.healthInsurance.toLowerCase().startsWith(searchTermLower)||
      patient.phoneNr.toLowerCase().startsWith(searchTermLower)
    );
  }

  // Tooltip methods
  showTooltip(event: MouseEvent, tooltips: { label: string, value: string }[]) {
    const tooltipElement = this.renderer.createElement('div');
    tooltipElement.className = 'custom-tooltip';

    // Construct tooltip content
    tooltips.forEach(info => {
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


}
