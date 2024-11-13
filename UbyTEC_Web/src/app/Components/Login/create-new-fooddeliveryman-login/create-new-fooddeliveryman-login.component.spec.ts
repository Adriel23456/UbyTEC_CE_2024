import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFooddeliverymanLoginComponent } from './create-new-fooddeliveryman-login.component';

describe('CreateNewFooddeliverymanLoginComponent', () => {
  let component: CreateNewFooddeliverymanLoginComponent;
  let fixture: ComponentFixture<CreateNewFooddeliverymanLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewFooddeliverymanLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewFooddeliverymanLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
