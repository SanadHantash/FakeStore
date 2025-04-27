import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from "./products/products.component";
import { CreateProductComponent } from "./create-prodcut/create-prodcut.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsComponent, CreateProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
