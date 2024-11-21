import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessManagerComponent } from './edit-business-manager.component';

describe('EditBusinessManagerComponent', () => {
  let component: EditBusinessManagerComponent;
  let fixture: ComponentFixture<EditBusinessManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
