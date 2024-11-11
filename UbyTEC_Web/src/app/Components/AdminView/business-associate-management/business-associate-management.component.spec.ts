import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAssociateManagementComponent } from './business-associate-management.component';

describe('BusinessAssociateManagementComponent', () => {
  let component: BusinessAssociateManagementComponent;
  let fixture: ComponentFixture<BusinessAssociateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAssociateManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAssociateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
