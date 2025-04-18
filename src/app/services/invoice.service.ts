import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { Product } from '../models/product.model'; // <-- Import this

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private baseUrl = 'https://localhost:7115/api/Invoice';
  private productUrl = 'https://localhost:7115/api/Product'; // <-- Add this

  constructor(private http: HttpClient) {}

  saveInvoice(invoice: Invoice) {
    return this.http.post<Invoice>(`${this.baseUrl}/Create`, invoice);
  }

  getAllInvoices() {
    return this.http.get<Invoice[]>(`${this.baseUrl}/GetAll`);
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.productUrl}/GetAll`);
  }
}
