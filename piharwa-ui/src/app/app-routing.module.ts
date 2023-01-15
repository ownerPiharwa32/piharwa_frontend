import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Pages/terms-and-conditions/terms-and-conditions.component';
import { ShippingPolicyComponent } from './Pages/shipping-policy/shipping-policy.component';
import { BlogDetailsComponent } from './Pages/blog-details/blog-details.component';
import { BlogListComponent } from './Pages/blog-list/blog-list.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component'
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { ProductDetailsPageComponent } from './Pages/products-page/product-details-page/product-details-page.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ListAddressComponent } from './Pages/add-adress-contact/list-address/list-address.component';
import { LoginPageComponent } from './Pages/login/login-page/login-page.component';
import { AddAdressContactComponent } from './Pages/add-adress-contact/add-adress-contact.component';
import { WrongRouteComponent } from './Pages/wrong-route/wrong-route.component';

const routes: Routes = [
  {
    path: '',
    component: WrongRouteComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'nopage'
  // },
  { path: 'nopage', component: WrongRouteComponent },

  { path: 'home', component: HomepageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'productlist/:id', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsPageComponent },
  { path: 'product-cart', component: CartComponent },
  { path: 'list-Address', component: ListAddressComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'addaddress', component: AddAdressContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'shipping-policy', component: ShippingPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/:id', component: BlogDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
