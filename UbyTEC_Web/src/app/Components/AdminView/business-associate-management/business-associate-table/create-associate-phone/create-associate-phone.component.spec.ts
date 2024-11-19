import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociatePhoneComponent } from './create-associate-phone.component';

describe('CreateAssociatePhoneComponent', () => {
  let component: CreateAssociatePhoneComponent;
  let fixture: ComponentFixture<CreateAssociatePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssociatePhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssociatePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
