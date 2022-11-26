import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
  loginApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.loginApi,data);
   }
   registerApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.registerApi,data);
   }
   otpTokenApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.otpToken,data);
   }
}