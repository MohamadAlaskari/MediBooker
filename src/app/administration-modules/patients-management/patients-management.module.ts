import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsManagementRoutingModule } from './patients-management-routing.module';
import { PatientsManagementComponent } from './components/patients-management/patients-management.component';
import { AppointmentService } from '../../core/services/appointment-service/appointment.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientsManagementComponent],
  imports: [CommonModule, FormsModule, PatientsManagementRoutingModule],
  providers: [AppointmentService],
})
export class PatientsManagementModule {}
