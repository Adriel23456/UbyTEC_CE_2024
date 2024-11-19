import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociateComponent } from './edit-associate.component';

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAssociateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
