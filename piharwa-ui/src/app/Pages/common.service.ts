import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, HostListener, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiConstants } from '../api-path/api-config';

function _window(): any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar'],
    });
  }

  profileApi() {
    return this.http.get(ApiConstants.apiURL + ApiConstants.profileApi);
  }

  createOrderId(data: any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.createOrderId, data);
  }

  verifyPaymentApi(data: any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.verifyPaymentApi, data);
  }
  public ProfileData: EventEmitter<any> = new EventEmitter();
  public ProfileDataAll: any;
  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  message: any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'piharwa shop';


}
