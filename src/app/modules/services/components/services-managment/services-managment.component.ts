import { Component } from '@angular/core';
import { Service } from '../../../../core/models/Service.model';
import { ServicemanagmentService } from '../../services/services/servicemanagment.service';

@Component({
  selector: 'app-services-managment',
  templateUrl: './services-managment.component.html',
  styleUrl: './services-managment.component.scss'
})
export class ServicesManagmentComponent {

  Services: Service[] = [];


  constructor(private Servicemanagment: ServicemanagmentService) {

  }

  ngOnInit() {
    this.getServices();
  }
  getServices() {
    this.Servicemanagment.getServices().subscribe({
      next: (Services: Service[]) => {
        this.Services = Services;
        console.log('Loading all Services successfully', this.Services);
      },
      error: (error) => {
        this.Services = [];
        console.error('An error occurred while loading all Services', error);
      },
    });
  }

}
