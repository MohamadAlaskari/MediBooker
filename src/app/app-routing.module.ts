import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { AppoitmentsComponent } from './modules/appoitments/components/appoitments/appoitments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'appoitments', component: AppoitmentsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, // Fallback-Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
