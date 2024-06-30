import { Component, ElementRef, ViewChild } from '@angular/core';
import { Service } from '../../../../core/models/Service.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../../core/services/service-service/service.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrl: './services-management.component.scss',
})
export class ServicesManagementComponent {
  Services: Service[] = [];
  searchTerm: string = '';
  @ViewChild('Modal') Modal!: ElementRef;
  form: FormGroup;
  types = [
    'Health Check-ups',
    'X-rays',
    'Vaccinations',
    'Blood Tests',
    'Allergy Testing',
    'Ultrasound',
  ];

  EditMode = false;
  selectedserviceId: number | null = null;

  constructor(
    private Servicemanagment: ServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.getServices();
  }
  openModal(): void {
    const modalElement = this.Modal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
  hideModal(): void {
    const modalElement = this.Modal.nativeElement;

    const bootstrapModal = new bootstrap.Modal(modalElement);

    bootstrapModal.hide();
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
  filteredServices() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.Services.filter(
      (Service) =>
        Service.type.toLowerCase().startsWith(searchTermLower) ||
        Service.description.toLowerCase().startsWith(searchTermLower)
    );
  }
  removeservice(index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteservice(index);
      }
    });
  }

  deleteservice(serviceid: string): void {
    this.Servicemanagment.deleteservice(serviceid).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'service has been deleted.',
          icon: 'success',
        });
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const { type, description } = this.form.value;
      if (this.EditMode) {
        if (this.selectedserviceId !== null) {
          this.Servicemanagment.updateservice(
            this.selectedserviceId,
            type,
            description
          ).subscribe({
            next: () => {
              this.hideModal();
              Swal.fire({
                title: 'Success!',
                text: ' Service updated.',
                icon: 'success',
              });
              this.ngOnInit(); // Optional: Refresh or reset form
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else {
          console.error('Cannot update Service: serviceid is null');
        }
      } else {
        this.Servicemanagment.addservice(type, description).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'New Service added.',
              icon: 'success',
            });
            this.ngOnInit(); // Optional: Refresh or reset form
          },
          error(error) {
            console.error(error);
          },
        });
      }
    }
  }

  editservice(serviceid: number) {
    this.EditMode = true;
    this.selectedserviceId = serviceid;

    const service = this.getServicebyid(serviceid);

    // Check if employee is undefined
    if (!service) {
      // Handle the case where employee is not found
      console.error(`service with ID ${serviceid} not found.`);
      return; // Exit the function or handle accordingly
    }

    // Set the form values using patchValue
    this.form.patchValue({
      type: service.type,
      description: service.description,
    });

    this.openModal();
  }

  getServicebyid(serviceid: number) {
    return this.Services.find((serv) => serv.id === serviceid);
  }
  setEditModefalse(): void {
    this.EditMode = false;
    this.resetForm();
  }
  resetForm() {
    this.form.reset();
    this.selectedserviceId = null;
  }
}
