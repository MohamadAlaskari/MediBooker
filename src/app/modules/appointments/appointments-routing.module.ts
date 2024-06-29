import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';

const routes: Routes = [
  { path: '', component: AppointmentsComponent },
  { path: 'add', component: AddAppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
