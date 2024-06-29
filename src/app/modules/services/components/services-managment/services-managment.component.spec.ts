import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesManagmentComponent } from './services-managment.component';

describe('ServicesManagmentComponent', () => {
  let component: ServicesManagmentComponent;
  let fixture: ComponentFixture<ServicesManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
