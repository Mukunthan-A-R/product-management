import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  productList: Product[] = [];
  searchTerm: string = '';
  selectedGST: string = '';
  isEditMode = false;
  product: Product = {
    productName: '',
    productDescription: '',
    price: 0,
    availableQuantity: 0,
    gst: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
    });
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(p: Product): void {
    this.product = { ...p };
    this.isEditMode = true;
  }

  deleteProduct(id?: number): void {
    if (id && confirm('Are you sure to delete?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  resetForm(): void {
    this.product = {
      productName: '',
      productDescription: '',
      price: 0,
      availableQuantity: 0,
      gst: 0
    };
    this.isEditMode = false;
  }

  filteredProducts(): Product[] {
    return this.productList.filter(p =>
      p.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedGST === '' || p.gst.toString() === this.selectedGST)
    );
  }
}
