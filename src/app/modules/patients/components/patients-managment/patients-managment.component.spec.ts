import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsManagmentComponent } from './patients-managment.component';

describe('PatientsManagmentComponent', () => {
  let component: PatientsManagmentComponent;
  let fixture: ComponentFixture<PatientsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
