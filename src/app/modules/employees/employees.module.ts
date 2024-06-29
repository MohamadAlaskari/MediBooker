import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesManagmentComponent } from './components/employees-managment/employees-managment.component';


@NgModule({
  declarations: [
    EmployeesManagmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
