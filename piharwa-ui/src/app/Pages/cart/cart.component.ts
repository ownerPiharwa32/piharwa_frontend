import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { PaymentsComponent } from '../payments/payments.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { json } from 'stream/consumers';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any = <any>[];
  subtotal: any;
  @ViewChild(PaymentsComponent) patment!: PaymentsComponent;

  constructor(
    private commonService: CommonService,
    public cartService: CartService,
    public router: Router,
    private _authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    if (localStorage.getItem('LoggedInUser')) {
      this.cartService.getCartDataFromBackend()
        .subscribe((resposne: any) => {
          console.log("cart data ", resposne);
          this.cartData = [];
          resposne.data.forEach((element: any) => {
            this.cartData.push({
              _id: element.productId,
              productTitle: element.productTitle,
              price: element.price,
              quantity: element.quantity,
              total: element.price * element.quantity,
              pimage: element.productImg,
              sizes: element.sizes,
              cartId: element._id
            });
          });
          localStorage.setItem('userCart', JSON.stringify(this.cartData));
          this.cartService.subtotal();
          this.subtotaldata();
        });
    }
    else {
      this.cartData = this.cartService.getItemData();
      this.cartService.subtotal();
      this.subtotaldata();
    }

  }

  removeData(product: any) {
    if (localStorage.getItem('LoggedInUser')) {
      this.cartService.deleteFromCartOnBackend(product._id)
        .subscribe((resposne: any) => {
          console.log("resposne ", resposne);
          this.cartService.deleteItem(product);
          this.getCartData();
        });
    } else {
      this.cartService.deleteItem(product);
      this.getCartData();
    }

  }

  updateQuantity(product: any) {
    console.log("updateQuantity ", product);
    if (localStorage.getItem('LoggedInUser')) {
      this.cartService.updateCartOnBackend({
        "cartId": product.cartId,
        "productId": product._id,
        "quantity": product.quantity,
        "sizes": "NA"
      })
        .subscribe((resposne: any) => {
          console.log("resposne ", resposne);
          this.getCartData();
        });
    } else {
      this.cartData.forEach((cartProduct: any) => {
        if(cartProduct._id === product._id) {
          cartProduct.quantity = product.quantity;
        }
      });
      localStorage.setItem('userCart', JSON.stringify(this.cartData));
      this.getCartData();
    }
  }

  increment(product: any) {
    console.log("increment ", product);
    if (product.quantity > 4) {
      this.commonService.openSnackBar("You can add maximum 4 quantity", 'Dismiss');
    }
    else {
      product.quantity += 1;
      this.updateQuantity(product);
    }
  }

  decrement(product: any) {
    console.log("decrement ", product);
    if (product.quantity !== 0) {
      product.quantity -= 1;
      this.updateQuantity(product);
    }
  }

  subtotaldata() {
    this.subtotal = this.cartService.getsubtotalData();
    console.log(this.subtotal)
  }

  // clearCart() {
  //   this.cartService.clearData();
  // }

  continueToShipping() {
    console.log("this.commonService.ProfileData 1 ", this.commonService.ProfileData);
    const token = this._authService.getToken();
    console.log("token ", token);
    if (token) {
      this.router.navigate(['/payment']);
    }
    else {
      this.dialog.open(LoginPageComponent, {
        width: '700px',
      });
    }
  }

  toContinue() {
    console.log("toContinue");
    // this.commonService.paynow();
    //  this.route.navigate(["/list-Address"]);
  }
}