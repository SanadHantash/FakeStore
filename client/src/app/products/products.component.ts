import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { DeleteComponent, EditComponent } from 'src/assets';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditProductComponent } from '../edit-product/edit-product.component';


interface Products {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, PaginationComponent, DeleteComponent, EditComponent, MatDialogModule]
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  page: number = 1;
  pageSize: number = 6;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const products = await this.productService.getProdcuts();
    this.products = products.map(product => ({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      description: product.description,
      category: product.category
    }));
  }

  get paginatedProducts(): Products[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.products.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
  }

  onEdit(product: Products): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '800px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        Swal.fire('Updated!', `${product.title} has been updated.`, 'success');

        let updatedImage = result.image;

        if (result.imageFile) {
          updatedImage = await this.convertFileToBase64(result.imageFile);
        }

        await this.productService.editProduct(product.id, {
          id: product.id,
          title: result.title,
          price: result.price,
          description: result.description,
          category: result.category,
          image: updatedImage,
        });

        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...result, image: updatedImage };
        }
      }
    });
  }

  private async convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  async onDelete(product: Products): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${product.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await this.productService.deleteProduct(product.id);
        this.products = this.products.filter(p => p.id !== product.id);
        Swal.fire('Deleted!', `${product.title} has been deleted.`, 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the product.', 'error');
      }
    }
  }
}
