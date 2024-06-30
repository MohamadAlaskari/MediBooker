import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { ServiceService } from '../../core/services/service-service/service.service';
@NgModule({
  declarations: [
    AppointmentsComponent,
    CalendarComponent,
    AddAppointmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentsRoutingModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
})
export class AppointmentsModule {}
