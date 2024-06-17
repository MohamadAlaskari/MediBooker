import { Component } from '@angular/core';
import { Employeeservice } from '../../services/employees/employeeservices.service';
import { Employee } from '../../../../core/models/Employee.model';

@Component({
  selector: 'app-employees-managment',
  templateUrl: './employees-managment.component.html',
  styleUrl: './employees-managment.component.scss'
})
export class EmployeesManagmentComponent {

  employees: Employee[] = [];


  constructor(private Employeeservice: Employeeservice) {

  }

  ngOnInit() {
    this.getEmployess();
  }


  getEmployess() {
    this.Employeeservice.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employees = employees;
        console.log('Loading all employees successfully', this.employees);
      },
      error: (error) => {
        this.employees = [];
        console.error('An error occurred while loading all employees', error);
      },
    });

  }



}
