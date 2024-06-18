import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsManagmentComponent } from './components/patients-managment/patients-managment.component';


@NgModule({
  declarations: [
    PatientsManagmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
