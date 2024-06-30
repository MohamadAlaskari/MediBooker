import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsManagementComponent } from './appointments-management.component';

describe('AppointmentsManagementComponent', () => {
  let component: AppointmentsManagementComponent;
  let fixture: ComponentFixture<AppointmentsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
