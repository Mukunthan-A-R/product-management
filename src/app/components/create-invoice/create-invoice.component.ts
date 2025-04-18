import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Product } from '../../models/product.model';
import { InvoiceDetail } from '../../models/invoice.model';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  products: Product[] = [];
  invoiceDetails: InvoiceDetail[] = [];
  invoiceSaved: boolean = false;

invoiceSummary: Invoice = {
  customerName: '',
  grandTotal: 0,
  invoiceDetails: []
};


  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      customerName: [''],
      date: [''],
      productSelections: this.fb.array([])
    });

    this.loadProducts();
  }

  isProductSelected(productId: number): boolean {
    return this.invoiceDetails.some(i => i.productID === productId);
  }
  

  loadProducts(): void {
    this.invoiceService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  onCheckboxChange(event: Event, product: Product): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    if (isChecked) {
      this.invoiceDetails.push({
        productID: product.productID!,
        quantity: 1,
        price: product.price,
        gst: product.gst,
        totalAmount: this.calculateTotal(product.price, 1, product.gst)
      });
    } else {
      this.invoiceDetails = this.invoiceDetails.filter(i => i.productID !== product.productID);
    }
  }

  onQuantityChange(productId: number, quantity: number): void {
    const detail = this.invoiceDetails.find(i => i.productID === productId);
    const product = this.products.find(p => p.productID === productId);

    if (detail && product) {
      detail.quantity = quantity;
      detail.totalAmount = this.calculateTotal(product.price, quantity, product.gst);
    }
  }

  calculateTotal(price: number, quantity: number, gst: number): number {
    const subtotal = price * quantity;
    return subtotal + (subtotal * gst / 100);
  }

  getQuantity(productId: number): number {
    const detail = this.invoiceDetails.find(i => i.productID === productId);
    return detail?.quantity ?? 1;
  }
  
  getTotalAmount(productId: number): string {
    const detail = this.invoiceDetails.find(i => i.productID === productId);
    return detail?.totalAmount?.toFixed(2) ?? '0.00';
  }
  
  getGrandTotal(): number {
    return this.invoiceDetails.reduce((sum, item) => sum + item.totalAmount, 0);
  }
  

  submitInvoice(): void {
    const invoice = {
      customerName: this.invoiceForm.value.customerName,
      date: this.invoiceForm.value.date,
      grandTotal: this.getGrandTotal(),
      invoiceDetails: this.invoiceDetails
    };

    this.invoiceService.saveInvoice(invoice).subscribe({
      next: () => {
        alert('Invoice saved successfully!');
        this.invoiceForm.reset();
        this.invoiceDetails = [];
      },
      error: () => {
        alert('Error saving invoice.');
      }
    });
  }
}
