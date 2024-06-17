import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentManagmentComponent } from './components/appointment-managment/appointment-managment.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    CalendarComponent,
    AppointmentManagmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentsRoutingModule,
    BsDatepickerModule.forRoot()
  ]
})
export class AppointmentsModule { }
