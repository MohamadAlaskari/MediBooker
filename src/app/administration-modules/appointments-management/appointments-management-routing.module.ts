import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsManagementComponent } from './components/appointments-management/appointments-management.component';

const routes: Routes = [{ path: '', component: AppointmentsManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsManagementRoutingModule {}
