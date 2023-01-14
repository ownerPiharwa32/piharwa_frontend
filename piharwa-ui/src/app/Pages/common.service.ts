import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiConstants } from '../api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }

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

}
