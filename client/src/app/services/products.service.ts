import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';

  async getProdcuts(): Promise<Product[]> {
    const response = await axios.get(`${this.apiUrl}/products`);
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/products/${id}`);
    } catch (error) {
      console.error(`Failed to delete product with id ${id}:`, error);
    }
  }
async editProduct(id: number, updatedProduct: Omit<Product, 'rating'>): Promise<void> {
  try {
    await axios.put(`${this.apiUrl}/products/${id}`, {
      id: id,
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
      category: updatedProduct.category,
      image: updatedProduct.image
    });
  } catch (error) {
    console.error(`Failed to edit product with id ${id}:`, error);
  }
}
async createProduct(createdProduct: Omit<Product, 'rating' | 'id'>): Promise<Product> {
  try {
    const response = await axios.post(`${this.apiUrl}/products`, createdProduct);
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
}


}
