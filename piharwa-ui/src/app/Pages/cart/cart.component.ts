import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any;
  subtotal: any;


  constructor(public cartService :CartService,public route :Router) { }

  ngOnInit() {
      this.subtotaldata();
      this.getCartData();
  }
  getCartData(){
    this.cartData = this.cartService.getItemData()
    console.log(this.cartData);
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
   this.route.navigate(["/list-Address"]);
  }
}
