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
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './Pages/login/login-page/login-page.component';
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
    
  ],
  imports: [
    BrowserModule,HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,FormsModule,NgImageSliderModule,BrowserAnimationsModule,MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
