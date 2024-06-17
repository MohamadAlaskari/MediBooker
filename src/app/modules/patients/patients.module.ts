import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsManagmentComponent } from './components/patients-managment/patients-managment.component';


@NgModule({
  declarations: [
    PatientsManagmentComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
