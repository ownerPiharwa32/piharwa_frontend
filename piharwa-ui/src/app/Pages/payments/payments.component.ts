import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { ListAddressService } from '../add-adress-contact/list-address/list-address.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  cartData: any;
  subtotal: any;
  address: any;

  constructor(public cartService :CartService,public router :Router,
    public commonservice :CommonService,public listAddressService: ListAddressService,
    private _authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
      this.subtotaldata();
      this.getCartData();
      this.getAddressList();

  }
  getCartData(){
    this.cartData = this.cartService.getItemData()
  }
  removeData(data:any) {
    this.cartService.deleteItem(data);
    this.getCartData();
    this.subtotaldata();
  }

  subtotaldata(){
    this.subtotal =this.cartService.getsubtotalData();
    console.log(this.subtotal)
  }
  clearCart() {
    this.cartService.clearData();
  }
  getAddressList() {
    this.listAddressService.addressDetailsApi().subscribe((data) => this.getAddressListApi(data));
  }

  getAddressListApi(data: any) {
    if (data.status === true) {
      this.address =data.data;
      console.log(this.address)
    }

  }
  continueToShipping() {
    console.log("this.commonService.ProfileData 1 ", this.commonservice.ProfileData);
    const token = this._authService.getToken();
      console.log("token ", token);
    if ( token) {
      this.router.navigate(['/payment']);
    }
    else {
      this.dialog.open(LoginPageComponent, {
        width: '700px',
      });
    }
  }
  continueToPayment(){
    this.commonservice.paynow();
  }


  addAddress(){
    this.router.navigate(["/list-Address"]);
  }
}