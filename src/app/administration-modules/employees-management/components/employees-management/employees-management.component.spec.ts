import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesManagementComponent } from './employees-management.component';

describe('EmployeesManagementComponent', () => {
  let component: EmployeesManagementComponent;
  let fixture: ComponentFixture<EmployeesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
