import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAssignComponent } from './order-assign.component';

describe('OrderAssignComponent', () => {
  let component: OrderAssignComponent;
  let fixture: ComponentFixture<OrderAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
