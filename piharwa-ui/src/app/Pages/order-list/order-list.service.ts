import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
    
  }
   ordersListApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.orderListApi, data);
   }
}
