import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employeeservice } from '../../services/employees/employeeservices.service';
import { Employee } from '../../../../core/models/Employee.model';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal'; // Import ngx-bootstrap ModalDirective
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-employees-managment',
  templateUrl: './employees-managment.component.html',
  styleUrls: ['./employees-managment.component.scss']
})
export class EmployeesManagmentComponent {
  searchTerm: string = '';
  employees: Employee[] = [];
  @ViewChild('Modal') Modal!: ElementRef;

  signUpForm: FormGroup;
  currentStep: number = 1;
  loginFormSubmitted: boolean = false;

  EditMode = false;
  selectedEmployeeId: number | null = null;

  constructor(private employeeService: Employeeservice, private renderer: Renderer2) {
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

  ngOnInit(): void {
    this.getEmployees();
  }
  openModal(): void {
    const modalElement = this.Modal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
  hideModal(): void {
    const modalElement = this.Modal.nativeElement;

    const bootstrapModal = new bootstrap.Modal(modalElement);

    bootstrapModal.hide();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
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

  removeEmployee(index: any): void {
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
        this.deleteEmployee(index);
      }
    });
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteemployee(employeeId).subscribe({
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

  filteredEmployees(): Employee[] {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.employees.filter(employee =>
      employee.name.toLowerCase().startsWith(searchTermLower) ||
      employee.surname.toLowerCase().startsWith(searchTermLower) ||
      employee.email.toLowerCase().startsWith(searchTermLower) ||
      employee.city.toLowerCase().startsWith(searchTermLower)
    );
  }

  showTooltip(event: MouseEvent, tooltips: { label: string, value: string }[]): void {
    const tooltipElement = this.renderer.createElement('div');
    tooltipElement.className = 'custom-tooltip';

    tooltips.forEach(info => {
      const p = this.renderer.createElement('p');
      p.textContent = `${info.label}: ${info.value}`;
      this.renderer.appendChild(tooltipElement, p);
    });

    const mouseX = event.clientX + window.scrollX;
    const mouseY = event.clientY + window.scrollY;
    this.renderer.setStyle(tooltipElement, 'top', mouseY + 'px');
    this.renderer.setStyle(tooltipElement, 'left', mouseX + 'px');

    this.renderer.appendChild(document.body, tooltipElement);
  }

  hideTooltip(): void {
    const tooltipElement = document.querySelector('.custom-tooltip');
    if (tooltipElement) {
      this.renderer.removeChild(document.body, tooltipElement);
    }
  }

  previousStep(): void {
    this.currentStep--;
  }

  nextStep(): void {
    this.currentStep++;
  }

  submit(): void {
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
      if (this.EditMode) {
        if (this.selectedEmployeeId !== null) {
          this.employeeService.updateemployee(this.selectedEmployeeId, name, surname, email, street, hNr, postcode, city,).subscribe({
            next: () => {
              this.hideModal();
              Swal.fire({
                title: 'Success!',
                text: ' Employee updated.',
                icon: 'success'
              });
              this.ngOnInit(); // Optional: Refresh or reset form
            },
            error: (error) => {
              console.error('Sign Up error', error);
            },
          });
        } else {
          console.error('Cannot update employee: selectedEmployeeId is null');
        }

      } else {
        this.employeeService.addemployee(name, surname, email, password, street, hNr, postcode, city,).subscribe({
          next: () => {
            this.hideModal();
            Swal.fire({
              title: 'Success!',
              text: 'New Employee added.',
              icon: 'success'
            });
            this.ngOnInit(); // Optional: Refresh or reset form
          },
          error: (error) => {
            console.error('Sign Up error', error);
          },
        });
      }

    } else {
      console.log('Form is invalid');
    }
  }



  editEmployee(employeeId: number) {
    this.EditMode = true;
    this.selectedEmployeeId = employeeId;

    const employee = this.getEmployeeById(employeeId);

    // Check if employee is undefined
    if (!employee) {
      // Handle the case where employee is not found
      console.error(`Employee with ID ${employeeId} not found.`);
      return; // Exit the function or handle accordingly
    }

    // Set the form values using patchValue
    this.signUpForm.patchValue({
      name: employee.name,
      surname: employee.surname,
      email: employee.email,
      password: employee.password,
      street: employee.street,
      hNr: employee.hNr,
      postcode: employee.postcode,
      city: employee.city
    });

    this.openModal();

  }

  getEmployeeById(employeeId: number) {
    return this.employees.find(emp => emp.id === employeeId);
  }
  setEditModefalse(): void {
    this.EditMode = false;
    this.resetForm();
  }
  resetForm() {
    this.signUpForm.reset();
    this.selectedEmployeeId = null;
  }
}
