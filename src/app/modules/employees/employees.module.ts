import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesManagmentComponent } from './components/employees-managment/employees-managment.component';


@NgModule({
  declarations: [
    EmployeesManagmentComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
