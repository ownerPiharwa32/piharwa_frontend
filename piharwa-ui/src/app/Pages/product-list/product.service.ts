import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
productListApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.productlist,data);
   }
}
