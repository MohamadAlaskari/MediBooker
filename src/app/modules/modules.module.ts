import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ToastNotificationsService } from '../shared/services/toast-notifications/toast-notifications.service';
import { core } from '@angular/compiler';
import { CoreModule } from '../core/core.module';
import { ServiceService } from '../core/services/service-service/service.service';
import { PatientService } from '../core/services/patient-service/patient.service';
import { AppointmentService } from '../core/services/appointment-service/appointment.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    HomeModule,
    AppointmentsModule,
    SharedModule,
  ],
  exports: [AuthModule, HomeModule, AppointmentsModule, SharedModule],
  providers: [ToastNotificationsService, ServiceService,PatientService, AppointmentService],
})
export class ModulesModule {}
