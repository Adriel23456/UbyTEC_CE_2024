import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessTypeComponent } from './edit-business-type.component';

describe('EditBusinessTypeComponent', () => {
  let component: EditBusinessTypeComponent;
  let fixture: ComponentFixture<EditBusinessTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
