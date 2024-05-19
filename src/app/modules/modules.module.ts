import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AddAppointmentModule } from './add-appointment/add-appointment.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    HomeModule,
    AddAppointmentModule,
    AddAppointmentModule,
  ],
})
export class ModulesModule {}
