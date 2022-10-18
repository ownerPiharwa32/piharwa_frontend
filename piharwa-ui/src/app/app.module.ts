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
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
