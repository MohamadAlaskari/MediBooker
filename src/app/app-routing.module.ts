import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'appointments',
    loadChildren: () =>
      import('./modules/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'appointments-management',
    loadChildren: () =>
      import(
        './administration-modules/appointments-management/appointments-management.module'
      ).then((m) => m.AppointmentsManagementModule),
  },

  {
    path: 'employees-management',
    loadChildren: () =>
      import(
        './administration-modules/employees-management/employees-management.module'
      ).then((m) => m.EmployeesManagementModule),
  },
  {
    path: 'services-management',
    loadChildren: () =>
      import(
        './administration-modules/services-management/services-management.module'
      ).then((m) => m.ServicesManagementModule),
  },
  {
    path: 'patients-management',
    loadChildren: () =>
      import(
        './administration-modules/patients-management/patients-management.module'
      ).then((m) => m.PatientsManagementModule),
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
