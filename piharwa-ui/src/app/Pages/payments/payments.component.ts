import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { ListAddressService } from '../add-adress-contact/list-address/list-address.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  cartData: any;
  subtotal: any;
  address: any;
  razorpayOrderId: any;

  options = {
    "key": "rzp_test_4Liw7psG1iJoHw",
    "amount": "",
    "name": "Java Chinna",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id": "",
    "handler": function (response: any) {
      console.log("component handler response ", response);
      console.log("razorpay_signature ", response.gateway);
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  constructor(public cartService: CartService, public router: Router,
    public commonservice: CommonService, public listAddressService: ListAddressService,
    private _authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subtotaldata();
    this.getCartData();
    this.getAddressList();

  }
  getCartData() {
    this.cartData = this.cartService.getItemData()
  }
  removeData(data: any) {
    this.cartService.deleteItem(data);
    this.getCartData();
    this.subtotaldata();
  }

  subtotaldata() {
    this.subtotal = this.cartService.getsubtotalData();
    console.log(this.subtotal)
  }
  clearCart() {
    this.cartService.clearData();
  }
  getAddressList() {
    this.listAddressService.defaultAddressApi().subscribe((data) => this.getDefaultAddressApi(data));
  }

  getDefaultAddressApi(data: any) {
    if (data.status === true) {
      this.address = data.data;
      console.log("this.address ", this.address);
      console.log(this.address,"==============================")
    }

  }
  continueToShipping() {
    console.log("this.commonService.ProfileData 1 ", this.commonservice.ProfileData);
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

  createOrderId() {

    console.log("this.address ", this.address);

    let sendData = {
      "cartId": "63d2496e04a97e9a3432460a",
      "firstName": this.address.firstName,
      "lastName": this.address.lastName,
      "mobileNo": this.address.mobileNo,
      "address_line_one": this.address.address_line_one,
      "address_line_two": this.address.address_line_two,
      "landmark": this.address.landmark,
      "city": this.address.city,
      "state": this.address.state,
      "country": this.address.country,
      "pincode": this.address.pincode,
      "amount": 0,
      "currency": "INR",
      "productDetails": <any>[]
    };

    const userCart = JSON.parse('' + localStorage.getItem("userCart"));

    userCart.forEach((cart: any) => {
      sendData.amount += cart.total
      sendData.productDetails.push({
        "productID": cart._id,
        "SellerStoreID": cart.SellerStoreID,
        "rootCategoryId": cart.rootCategoryId,
        "productCategoryID": cart.productCategoryID,
        "quantity": cart.quantity,
        "sizes": "NA"
      });
    });

    this.commonservice.createOrderId(sendData).subscribe((response: any) => {
      this.razorpayOrderId = response.data.razorpayOrderId;
      this.continueToPayment(response, {
        amount: sendData.amount,
        name: sendData.firstName + " " + sendData.lastName,
        mobileNo: sendData.mobileNo
      });
    });

  }

  continueToPayment(cartResposne: any, personalDetails: any) {
    this.options.amount = (personalDetails.amount * 100).toString(); //paise
    this.options.name = personalDetails.name;
    this.options.prefill.name = personalDetails.name;
    this.options.prefill.email = "";
    this.options.prefill.contact = personalDetails.mobileNo;
    this.options.order_id = cartResposne.data.razorpayOrderId;
    console.log("this.options ", this.options);
    var rzp1 = new Razorpay(this.options);
    rzp1.open();

    rzp1.on('payment.failed', function (response: any) {
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log("event.detail ", event.detail);
    this.commonservice.verifyPaymentApi(event.detail).subscribe((response: any) => {
      console.log("response ", response);
      if(response.status) {
        localStorage.setItem('userCart', '[{}]');
        this.router.navigate(["/order-list"]);
      }
    });
  }


  addAddress() {
    this.router.navigate(["/list-Address"]);
  }
}