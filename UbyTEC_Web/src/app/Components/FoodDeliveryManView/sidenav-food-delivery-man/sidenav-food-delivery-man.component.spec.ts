import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFoodDeliveryManComponent } from './sidenav-food-delivery-man.component';

describe('SidenavFoodDeliveryManComponent', () => {
  let component: SidenavFoodDeliveryManComponent;
  let fixture: ComponentFixture<SidenavFoodDeliveryManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFoodDeliveryManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavFoodDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
