import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { ProductDetailsPageComponent } from './Pages/products-page/product-details-page/product-details-page.component';
import { CartComponent } from './Pages/cart/cart.component';
import { AddAdressContactComponent } from './Pages/add-adress-contact/add-adress-contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {path: 'home', component: HomepageComponent },
  {path: 'product', component: ProductListComponent },
  {path: 'product-details/:id', component: ProductDetailsPageComponent },
  {path: 'product-cart', component: CartComponent } ,
  {path: 'add-Address', component: AddAdressContactComponent } ,

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
