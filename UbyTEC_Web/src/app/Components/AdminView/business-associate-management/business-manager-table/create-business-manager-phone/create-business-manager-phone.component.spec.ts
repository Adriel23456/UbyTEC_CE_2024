import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessManagerPhoneComponent } from './create-business-manager-phone.component';

describe('CreateBusinessManagerPhoneComponent', () => {
  let component: CreateBusinessManagerPhoneComponent;
  let fixture: ComponentFixture<CreateBusinessManagerPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusinessManagerPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessManagerPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
