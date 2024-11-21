import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPhotoDialogComponent } from './product-add-photo-dialog.component';

describe('ProductAddPhotoDialogComponent', () => {
  let component: ProductAddPhotoDialogComponent;
  let fixture: ComponentFixture<ProductAddPhotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddPhotoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
