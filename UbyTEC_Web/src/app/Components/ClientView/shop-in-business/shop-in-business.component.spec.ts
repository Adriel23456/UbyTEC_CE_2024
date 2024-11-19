import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInBusinessComponent } from './shop-in-business.component';

describe('ShopInBusinessComponent', () => {
  let component: ShopInBusinessComponent;
  let fixture: ComponentFixture<ShopInBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopInBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopInBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
