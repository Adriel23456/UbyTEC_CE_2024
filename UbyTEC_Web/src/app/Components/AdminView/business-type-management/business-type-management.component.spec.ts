import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypeManagementComponent } from './business-type-management.component';

describe('BusinessTypeManagementComponent', () => {
  let component: BusinessTypeManagementComponent;
  let fixture: ComponentFixture<BusinessTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTypeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
