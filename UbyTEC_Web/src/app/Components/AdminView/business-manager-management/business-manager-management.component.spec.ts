import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessManagerManagementComponent } from './business-manager-management.component';

describe('BusinessManagerManagementComponent', () => {
  let component: BusinessManagerManagementComponent;
  let fixture: ComponentFixture<BusinessManagerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessManagerManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessManagerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
