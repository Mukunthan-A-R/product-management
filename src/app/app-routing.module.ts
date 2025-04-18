import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { InvoiceHistoryComponent } from './components/invoice-history/invoice-history.component';

const routes: Routes = [
  { path: 'product-master', component: ProductMasterComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'invoice-history', component: InvoiceHistoryComponent },
  { path: '', redirectTo: 'product-master', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
