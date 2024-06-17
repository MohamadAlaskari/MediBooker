import { Component } from '@angular/core';
import { PatientService } from '../../services/patients/patientservices.service';
import { Patient } from '../../../../core/models/Patient.model';

@Component({
  selector: 'app-patients-managment',
  templateUrl: './patients-managment.component.html',
  styleUrl: './patients-managment.component.scss'
})
export class PatientsManagmentComponent {


  Patients: Patient[] = [];


  constructor(private PatientService: PatientService) {

  }

  ngOnInit() {
    this.getpatients();
  }
  getpatients() {
    this.PatientService.getPatients().subscribe({
      next: (Patients: Patient[]) => {
        this.Patients = Patients;
        console.log('Loading all Patients successfully', this.Patients);
      },
      error: (error) => {
        this.Patients = [];
        console.error('An error occurred while loading all Patients', error);
      },
    });

  }





}
