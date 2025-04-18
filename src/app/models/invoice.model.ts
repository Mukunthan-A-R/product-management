export interface InvoiceDetail {
    productID: number;
    productName?: string;
    quantity: number;
    price: number;
    gst: number;
    totalAmount: number;
  }
  
  export interface Invoice {
    invoiceId?: number;
    date?: string;
    customerName: string;
    grandTotal: number;
    invoiceDetails: InvoiceDetail[];
  }
  