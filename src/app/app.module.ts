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
import { HomeModule } from './modules/home/home.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AuthService } from './modules/auth/services/auth-service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { PatientsModule } from './modules/patients/patients.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { ServicesModule } from './modules/services/services.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    CoreModule,
    AppointmentsModule,
    ModulesModule,
    ServicesModule,
    SharedModule,
    BrowserModule,
    AuthModule,
    PatientsModule,
    EmployeesModule,

    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
