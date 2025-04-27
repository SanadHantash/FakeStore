import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../services/products.service';
import { Category } from 'src/enums';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-prodcut.component.html',
  styleUrls: ['./create-prodcut.component.scss']
})
export class CreateProductComponent {
  data = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  selectedFileName: string = '';
  selectedImagePreview: string |ArrayBuffer| null = null;
  imageFile: File | null = null;
  createdProduct: Product | null = null;
  categories = Object.values(Category);

  constructor(private productService: ProductService) {}

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
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

  previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  removeImage() {
    this.selectedFileName = '';
    this.selectedImagePreview = null;
    this.data.image = '';
  }

  async save() {
    const createdProductData: Omit<Product, 'rating' | 'id'> = {
      title: this.data.title,
      price: this.data.price,
      description: this.data.description,
      category: this.data.category,
      image: this.data.image,
    };

    try {
      const createdProduct = await this.productService.createProduct(createdProductData);
      this.createdProduct = createdProduct;
      Swal.fire('Success!', 'Product created successfully!', 'success');

      this.clearForm();

    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire('Error', 'Failed to create product!', 'error');
    }
  }


  cancel() {
    this.clearForm();
  }

  clearForm() {
    this.data = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    };
    this.selectedFileName = '';
    this.selectedImagePreview = null;
  }
}
