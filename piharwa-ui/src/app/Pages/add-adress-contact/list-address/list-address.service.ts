import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class ListAddressService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
   addressDetailsApi () {
    return this.http.get(ApiConstants.apiURL + ApiConstants.listAddress);
  }
  
  defaultAddressApi() {
    return this.http.get(ApiConstants.apiURL + ApiConstants.defaultAddress);
   }

   saveAddress(data:any){
    return this.http.post(ApiConstants.apiURL + ApiConstants.addaddress,data);
   }
   updateAddress(data:any){
    return this.http.put(ApiConstants.apiURL + ApiConstants.updateAddress,data);
   }
   deleteaddress(addressid:any){
    return this.http.delete(ApiConstants.apiURL + ApiConstants.deleteAddress+'/'+addressid);

   }
}
