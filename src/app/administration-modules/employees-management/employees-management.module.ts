import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesManagementRoutingModule } from './employees-management-routing.module';
import { EmployeesManagementComponent } from './components/employees-management/employees-management.component';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeesManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesManagementRoutingModule,
  ],
  providers: [EmployeeService],
})
export class EmployeesManagementModule {}
