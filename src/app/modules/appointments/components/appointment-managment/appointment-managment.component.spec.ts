import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentManagmentComponent } from './appointment-managment.component';

describe('AppointmentManagmentComponent', () => {
  let component: AppointmentManagmentComponent;
  let fixture: ComponentFixture<AppointmentManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
