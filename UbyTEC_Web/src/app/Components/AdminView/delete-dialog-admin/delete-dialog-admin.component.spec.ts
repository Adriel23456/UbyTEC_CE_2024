import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogAdminComponent } from './delete-dialog-admin.component';

describe('DeleteDialogAdminComponent', () => {
  let component: DeleteDialogAdminComponent;
  let fixture: ComponentFixture<DeleteDialogAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
