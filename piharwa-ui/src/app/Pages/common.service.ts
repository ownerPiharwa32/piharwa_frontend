import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, HostListener, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiConstants } from '../api-path/api-config';
declare var Razorpay: any;

function _window(): any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar,private http: HttpClient,@Inject(PLATFORM_ID) private platformId: object) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar'],
    });
  }
  profileApi () {
    return this.http.get(ApiConstants.apiURL + ApiConstants.profileApi);
   }

   paymentSendApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.paymentApi,data);
   }

   verifyPaymentApi(data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.verifyPaymentApi,data);
   }
   public ProfileData: EventEmitter<any> = new EventEmitter();
   public ProfileDataAll:any;
   get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  message:any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'piharwa shop';
  options = {
    "key": "rzp_test_4Liw7psG1iJoHw",
    "amount": "200",
    "name": "Aman jain",
    "description": "Payment for pirharwa",
    "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
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

  paynow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = "20000"; //paise
    this.options.prefill.name = "Abcd";
    this.options.prefill.email = "abcd@gmail.com";
    this.options.prefill.contact = "9999999999";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
  }


}
