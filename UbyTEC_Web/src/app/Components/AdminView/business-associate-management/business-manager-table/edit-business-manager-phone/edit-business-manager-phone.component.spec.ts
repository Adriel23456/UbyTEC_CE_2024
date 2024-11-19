import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessManagerPhoneComponent } from './edit-business-manager-phone.component';

describe('EditBusinessManagerPhoneComponent', () => {
  let component: EditBusinessManagerPhoneComponent;
  let fixture: ComponentFixture<EditBusinessManagerPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessManagerPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessManagerPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
