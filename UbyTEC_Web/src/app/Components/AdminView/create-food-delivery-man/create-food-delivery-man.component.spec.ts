import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodDeliveryManComponent } from './create-food-delivery-man.component';

describe('CreateFoodDeliveryManComponent', () => {
  let component: CreateFoodDeliveryManComponent;
  let fixture: ComponentFixture<CreateFoodDeliveryManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFoodDeliveryManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFoodDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
