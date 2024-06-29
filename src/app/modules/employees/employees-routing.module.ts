import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesManagmentComponent } from './components/employees-managment/employees-managment.component';

const routes: Routes = [{ path: '', component: EmployeesManagmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
