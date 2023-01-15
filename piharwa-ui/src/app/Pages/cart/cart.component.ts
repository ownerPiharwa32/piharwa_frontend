import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login/login-page/login-page.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any;
  subtotal: any;


  constructor(public cartService :CartService,public router :Router,public commonservice :CommonService,
    private _authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
      this.subtotaldata();
      this.getCartData();
  }
  getCartData(){
    this.cartData = this.cartService.getItemData()
    // console.log(this.cartData);
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

  continueToShipping() {
    console.log("this.commonService.ProfileData 1 ", this.commonservice.ProfileData);
    const token = this._authService.getToken();
      console.log("token ", token);
    if ( token) {
      this.router.navigate(['/list-Address']);
    }
    else {
      this.dialog.open(LoginPageComponent, {
        width: '700px',
      });
    }
  }

  toContinue(){
  
  //  this.route.navigate(["/list-Address"]);
  this.paymentCreate();
  }

  paymentCreate() {
   let userdata= {
      "amount": "10000",
      "currency": "INR"
    }
      this.commonservice.paymentSendApi(userdata).subscribe(
        (data) => this.saveResponse(data),
        (err) => console.log(err)
      );
  }
  saveResponse(data:any){
    console.log(data)
    this.rozaConfrimation(data.data);
  }

  rozaConfrimation(data:any) {
    let userdata={
      "razorpay_order_id": data.offer_id,
      "razorpay_payment_id": data.id,
      "razorpay_signature": ""
    }
       this.commonservice.verifyPaymentApi(userdata).subscribe(
         (data) => this.saveResponseRoza(data),
         (err) => console.log(err)
       );
   }
   saveResponseRoza(data:any){
     console.log(data)
   }
}
