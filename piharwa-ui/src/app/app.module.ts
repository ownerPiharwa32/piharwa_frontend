import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, MyPipe } from './Pages/header/header.component';
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
import { TreeModule } from '@circlon/angular-tree-component';
import { TermsAndConditionsComponent } from './Pages/terms-and-conditions/terms-and-conditions.component';
import { ShippingPolicyComponent } from './Pages/shipping-policy/shipping-policy.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { PaymentsComponent } from './Pages/payments/payments.component';
import { BlogListComponent } from './Pages/blog-list/blog-list.component';
import { BlogDetailsComponent } from './Pages/blog-details/blog-details.component';

import { confirmDialog } from './shared/dialog-box/confirm/confirm.component';
import { messageDialog } from './shared/dialog-box/message/message.component';

import { OrderListComponent } from './Pages/order-list/order-list.component';
import { LoaderComponent } from './Pages/common-page/loader/loader.component';
import { LoaderInterceptor } from './Pages/common-page/loader-intercepert/loader.interceptor';
import { ProfileInfoComponent } from './Pages/profile-info/profile-info.component';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

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
    ContactUsComponent,
    PaymentsComponent,
    BlogDetailsComponent,
    confirmDialog,
    messageDialog,
    BlogListComponent,
    OrderListComponent,
    LoaderComponent,
    ProfileInfoComponent,MyPipe, ForgetPasswordComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    TreeModule,FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,FormsModule,NgImageSliderModule,BrowserAnimationsModule,MaterialModule,NgxImageZoomModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [confirmDialog, messageDialog]
})
export class AppModule { }
