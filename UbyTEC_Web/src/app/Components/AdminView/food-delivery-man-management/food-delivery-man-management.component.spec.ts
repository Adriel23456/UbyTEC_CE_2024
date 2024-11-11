import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDeliveryManManagementComponent } from './food-delivery-man-management.component';

describe('FoodDeliveryManManagementComponent', () => {
  let component: FoodDeliveryManManagementComponent;
  let fixture: ComponentFixture<FoodDeliveryManManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDeliveryManManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDeliveryManManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
