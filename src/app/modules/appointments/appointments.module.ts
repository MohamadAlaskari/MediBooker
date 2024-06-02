import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [AppointmentsComponent, CalendarComponent],
  imports: [CommonModule, AppointmentsRoutingModule],
})
export class AppointmentsModule {}
