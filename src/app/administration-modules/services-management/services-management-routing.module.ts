import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesManagementComponent } from './components/services-management/services-management.component';

const routes: Routes = [{ path: '', component: ServicesManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesManagementRoutingModule {}
