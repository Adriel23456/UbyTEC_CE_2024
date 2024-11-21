import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodDeliveryManComponent } from './edit-food-delivery-man.component';

describe('EditFoodDeliveryManComponent', () => {
  let component: EditFoodDeliveryManComponent;
  let fixture: ComponentFixture<EditFoodDeliveryManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFoodDeliveryManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFoodDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
