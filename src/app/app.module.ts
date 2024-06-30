import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PatientsManagementModule } from './administration-modules/patients-management/patients-management.module';
import { ServicesManagementModule } from './administration-modules/services-management/services-management.module';
import { EmployeesManagementModule } from './administration-modules/employees-management/employees-management.module';
import { AppointmentsManagementModule } from './administration-modules/appointments-management/appointments-management.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    CoreModule,

    AppointmentsModule,
    ModulesModule,
    SharedModule,
    BrowserModule,
    AuthModule,

    PatientsManagementModule,
    EmployeesManagementModule,
    ServicesManagementModule,
    AppointmentsManagementModule,
    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
