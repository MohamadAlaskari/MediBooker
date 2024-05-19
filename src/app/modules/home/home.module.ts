import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';



@NgModule({
  declarations: [
    HomeComponent,
    OurServicesComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
