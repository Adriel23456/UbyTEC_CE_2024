import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPhotoDialogComponent } from './product-edit-photo-dialog.component';

describe('ProductEditPhotoDialogComponent', () => {
  let component: ProductEditPhotoDialogComponent;
  let fixture: ComponentFixture<ProductEditPhotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditPhotoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
