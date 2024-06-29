import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentsModule } from './appointments/appointments.module';

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
})
export class ModulesModule {}
