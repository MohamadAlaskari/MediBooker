import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesManagementComponent } from './components/employees-management/employees-management.component';

const routes: Routes = [{ path: '', component: EmployeesManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesManagementRoutingModule {}
