import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/enums';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  selectedImagePreview: string | ArrayBuffer | null = null;
  selectedFileName: string = '';
  imageFile: File | null = null;
  categories = Object.values(Category);

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data?.image) {
      this.selectedImagePreview = this.data.image;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.previewFile(file);
      this.selectedFileName = file.name;
      this.imageFile = file;
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedImagePreview = null;
    this.selectedFileName = '';
  }

  save() {
    this.dialogRef.close({ ...this.data, imageFile: this.imageFile });
  }

  cancel() {
    this.dialogRef.close();
  }
}
