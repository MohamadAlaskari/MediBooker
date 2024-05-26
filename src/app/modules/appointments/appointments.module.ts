import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [CommonModule, AppointmentsRoutingModule],
})
export class AppointmentsModule {}
