import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { InvoiceHistoryComponent } from './components/invoice-history/invoice-history.component';
import { ReactiveFormsModule } from '@angular/forms';


// Import other components here

@NgModule({
  declarations: [
    AppComponent,
    ProductMasterComponent,
    CreateInvoiceComponent,
    InvoiceHistoryComponent,
    // Add your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    // HttpClientModule, FormsModule, etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
