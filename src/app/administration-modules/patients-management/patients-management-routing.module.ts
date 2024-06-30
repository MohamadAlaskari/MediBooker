import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsManagementComponent } from './components/patients-management/patients-management.component';

const routes: Routes = [{ path: '', component: PatientsManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsManagementRoutingModule {}
