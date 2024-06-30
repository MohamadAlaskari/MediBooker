import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { ServiceService } from '../../core/services/service-service/service.service';

@NgModule({
  declarations: [
    HomeComponent,
    OurServicesComponent,
    AboutUsComponent,
    ContactUsComponent,
    OurTeamComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [ServiceService],
})
export class HomeModule {}
