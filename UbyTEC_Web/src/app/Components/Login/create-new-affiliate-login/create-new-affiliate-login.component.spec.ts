import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAffiliateLoginComponent } from './create-new-affiliate-login.component';

describe('CreateNewAffiliateLoginComponent', () => {
  let component: CreateNewAffiliateLoginComponent;
  let fixture: ComponentFixture<CreateNewAffiliateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewAffiliateLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewAffiliateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
