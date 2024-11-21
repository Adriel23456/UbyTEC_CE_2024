import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-add-photo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-add-photo-dialog.component.html',
  styleUrls: ['./product-add-photo-dialog.component.css']
})
export class ProductAddPhotoDialogComponent implements OnInit {
  photoForm: FormGroup;
  previewError = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddPhotoDialogComponent>
  ) {
    this.photoForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit() {
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

  onAdd(): void {
    if (this.photoForm.valid && !this.previewError) {
      this.dialogRef.close(this.photoForm.get('url')?.value);
    }
  }
}