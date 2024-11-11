import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReceptionComponent } from './order-reception.component';

describe('OrderReceptionComponent', () => {
  let component: OrderReceptionComponent;
  let fixture: ComponentFixture<OrderReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
