import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'appointments',
    loadChildren: () =>
      import('./modules/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'Employees',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: 'Services',
    loadChildren: () =>
      import('./modules/services/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'Patients',
    loadChildren: () =>
      import('./modules/patients/patients.module').then(
        (m) => m.PatientsModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: '**', redirectTo: 'home' }, // Fallback-Route beim fehler path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
