import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesManagmentComponent } from './components/services-managment/services-managment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServicesManagmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
