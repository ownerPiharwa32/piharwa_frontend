import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { ProductDetailsPageComponent } from './Pages/products-page/product-details-page/product-details-page.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ListAddressComponent } from './Pages/list-address/list-address.component';
import { LoginPageComponent } from './Pages/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {path: 'home', component: HomepageComponent },
  {path: 'product', component: ProductListComponent },
  {path: 'product-details/:id', component: ProductDetailsPageComponent },
  {path: 'product-cart', component: CartComponent } ,
  {path: 'list-Address', component: ListAddressComponent } ,
  {path: 'login', component: LoginPageComponent } ,

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
