import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesManagementRoutingModule } from './services-management-routing.module';
import { ServicesManagementComponent } from './components/services-management/services-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/service-service/service.service';

@NgModule({
  declarations: [ServicesManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ServicesManagementRoutingModule,
  ],
  providers: [ServiceService],
})
export class ServicesManagementModule {}
