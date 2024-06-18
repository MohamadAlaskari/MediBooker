import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employeeservice } from '../../services/employees/employeeservices.service';
import { Employee } from '../../../../core/models/Employee.model';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-employees-managment',
  templateUrl: './employees-managment.component.html',
  styleUrl: './employees-managment.component.scss'
})
export class EmployeesManagmentComponent {
  searchTerm: string = '';
  employees: Employee[] = [];
  @ViewChild('modal') modal!: ModalDirective;
  signUpForm: FormGroup;
  currentStep: number = 1;
  loginFormSubmitted: boolean = false;


  constructor(private Employeeservice: Employeeservice,private renderer: Renderer2) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      street: new FormControl('', [Validators.required]),
      hNr: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),

    });
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

  removeEmploye(index: any) {
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

       this.deleteEmploye(index);

      }
    });
  }

  deleteEmploye(userId: string): void {
    this.Employeeservice.deleteemployee(userId).subscribe({
      next: () => {
        Swal.fire({
          title: "Deleted!",
          text: "Employee has been deleted.",
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

  filteredEmployees() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.employees.filter(employee =>
      employee.name.toLowerCase().startsWith(searchTermLower) ||
      employee.surname.toLowerCase().startsWith(searchTermLower) ||
      employee.email.toLowerCase().startsWith(searchTermLower) ||
      employee.city.toLowerCase().startsWith(searchTermLower)
    );
  }
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
  previousStep() {
    this.currentStep--;
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }


  onSignUp(): void {
    this.loginFormSubmitted = true;
    if (this.signUpForm.valid) {
      const {
        name,
        surname,
        email,
        password,
        street,
        hNr,
        postcode,
        city,
      } = this.signUpForm.value;

      this.Employeeservice.addemployee(
        name,
        surname,
        email,
        password,
        street,
        hNr,
        postcode,
        city,
      ).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'New Employee added.',
            icon: 'success'
          });
          this.ngOnInit(); // Optional: Refresh or reset form
        },
        error(error) {
          console.error('Sign Up error', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  closeModal(): void {
    this.modal.hide();
  }



}
