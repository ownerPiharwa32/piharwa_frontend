import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { FeaturedProductComponent } from './Pages/featured-product/featured-product.component';
import { LatestArrivalComponent } from './Pages/latest-arrival/latest-arrival.component';
import { ProductSliderComponent } from './Pages/product-slider/product-slider.component';
import { ProductCounterComponent } from './Pages/product-counter/product-counter.component';
import { ProductDecoreComponent } from './Pages/product-decore/product-decore.component';
import { CustomerOpinionComponent } from './Pages/customer-opinion/customer-opinion.component';
import { HeaderSliderComponent } from './Pages/header-slider/header-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ProductDetailsPageComponent } from './Pages/products-page/product-details-page/product-details-page.component';
import { CartComponent } from './Pages/cart/cart.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AddAdressContactComponent } from './Pages/add-adress-contact/add-adress-contact.component'; 
import { MaterialModule } from './others-files/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryListComponent } from './Pages/category/category-list/category-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './Pages/login/login-page/login-page.component';
import { ListAddressComponent } from './Pages/add-adress-contact/list-address/list-address.component';
import { AddAddresComponent } from './Pages/add-adress-contact/manage-address/add-addres/add-addres.component';
import { TokenService } from './Pages/token.service';
import { WrongRouteComponent } from './Pages/wrong-route/wrong-route.component';
import { DeletePopupComponent } from './Pages/common-page/delete-popup/delete-popup.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Pages/terms-and-conditions/terms-and-conditions.component';
import { ShippingPolicyComponent } from './Pages/shipping-policy/shipping-policy.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeaturedProductComponent,
    LatestArrivalComponent,
    ProductSliderComponent,
    ProductCounterComponent,
    ProductDecoreComponent,
    CustomerOpinionComponent,
    HeaderSliderComponent,
    PortfolioComponent,
    ProductListComponent,
    HomepageComponent,
    ProductDetailsPageComponent,
    CartComponent,
    AddAdressContactComponent,
    CategoryListComponent,
    LoginPageComponent,
    ListAddressComponent,
    AddAddresComponent,
    WrongRouteComponent,
    DeletePopupComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ShippingPolicyComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,FormsModule,NgImageSliderModule,BrowserAnimationsModule,MaterialModule,
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
