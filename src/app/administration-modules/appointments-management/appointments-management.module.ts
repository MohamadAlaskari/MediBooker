import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsManagementRoutingModule } from './appointments-management-routing.module';
import { AppointmentsManagementComponent } from './components/appointments-management/appointments-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment-service/appointment.service';
import { ServiceService } from '../../core/services/service-service/service.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [AppointmentsManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AppointmentsManagementRoutingModule,
  ],
  providers: [AppointmentService, ServiceService],
})
export class AppointmentsManagementModule {}
