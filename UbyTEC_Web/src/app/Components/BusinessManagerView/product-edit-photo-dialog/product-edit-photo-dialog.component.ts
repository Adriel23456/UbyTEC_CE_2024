import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-edit-photo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-edit-photo-dialog.component.html',
  styleUrls: ['./product-edit-photo-dialog.component.css']
})
export class ProductEditPhotoDialogComponent implements OnInit {
  photoForm: FormGroup;
  previewError = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }
  ) {
    this.photoForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit() {
    this.photoForm.patchValue({
      url: this.data.url
    });

    this.photoForm.get('url')?.valueChanges.subscribe(() => {
      this.previewError = false;
    });
  }

  onImageError() {
    this.previewError = true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.photoForm.valid && !this.previewError) {
      this.dialogRef.close(this.photoForm.get('url')?.value);
    }
  }
}