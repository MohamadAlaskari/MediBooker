import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesManagmentComponent } from './employees-managment.component';

describe('EmployeesManagmentComponent', () => {
  let component: EmployeesManagmentComponent;
  let fixture: ComponentFixture<EmployeesManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
