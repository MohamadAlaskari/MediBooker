import { Component } from '@angular/core';
import { Service } from '../../../../core/models/Service.model';
import { OurservicesService } from '../../services/ourservices/ourservices.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  services: Service[] = [];

  subscription = new Subscription();

  constructor(private ourservices: OurservicesService) {
  }

  ngOnInit() {
    this.loadservices();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  loadservices() {
    this.subscription.add(
      this.ourservices.getServices().subscribe({
        next: (services: Service[]) => {
          this.services = services;
          console.log('Loading services  was successful',this.services);
        },
        error: (err) => {
          console.error(
            'An error occurred while fetching services',
            err
          );
        },
      })
    );
  }
}
