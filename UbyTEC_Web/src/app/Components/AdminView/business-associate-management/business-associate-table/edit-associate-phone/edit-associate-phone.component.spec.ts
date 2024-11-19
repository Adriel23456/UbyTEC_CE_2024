import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociatePhoneComponent } from './edit-associate-phone.component';

describe('EditAssociatePhoneComponent', () => {
  let component: EditAssociatePhoneComponent;
  let fixture: ComponentFixture<EditAssociatePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAssociatePhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssociatePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
