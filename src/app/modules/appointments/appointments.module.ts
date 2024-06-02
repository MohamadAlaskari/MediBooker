import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [AppointmentsComponent, CalendarComponent],
  imports: [CommonModule, AppointmentsRoutingModule, FormsModule],
})
export class AppointmentsModule {}
