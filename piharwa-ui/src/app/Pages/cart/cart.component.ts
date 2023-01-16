import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { PaymentsComponent } from '../payments/payments.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any;
  subtotal: any;
  @ViewChild(PaymentsComponent) patment!: PaymentsComponent;

  constructor(public cartService :CartService,public route :Router,public commonservice :CommonService,) { }

  ngOnInit() {
      this.subtotaldata();
      this.getCartData();
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
  toContinue(){
    this.commonservice.paynow();
  //  this.route.navigate(["/list-Address"]);
  }
}