import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesManagmentComponent } from './components/services-managment/services-managment.component';

const routes: Routes = [{ path: '', component: ServicesManagmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
