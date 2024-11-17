import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInBusinesComponent } from './shop-in-busines.component';

describe('ShopInBusinesComponent', () => {
  let component: ShopInBusinesComponent;
  let fixture: ComponentFixture<ShopInBusinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopInBusinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopInBusinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
