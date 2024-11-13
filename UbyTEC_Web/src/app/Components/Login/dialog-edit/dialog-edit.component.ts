import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {
  phoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { phone: number }
  ) {
    this.phoneForm = this.fb.group({
      phone: [data.phone, [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.phoneForm.valid) {
      this.dialogRef.close({
        oldPhone: this.data.phone,
        newPhone: this.phoneForm.value.phone
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}