import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
  invoices: Invoice[] = [];
  selectedInvoice?: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe(res => {
      this.invoices = res;
    });
  }

  viewInvoice(invoice: Invoice) {
    this.selectedInvoice = invoice;
  }

  closeSummary() {
    this.selectedInvoice = undefined;
  }
}
