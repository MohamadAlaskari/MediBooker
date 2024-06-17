import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsManagmentComponent } from './components/patients-managment/patients-managment.component';

const routes: Routes = [{ path: '', component: PatientsManagmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
