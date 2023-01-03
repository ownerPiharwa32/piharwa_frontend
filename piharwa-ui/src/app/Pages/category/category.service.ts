import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../../api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
  categoryListApi () {
    return this.http.get(ApiConstants.apiURL + ApiConstants.categorylist);
   }
   mainCategoryListApi(){
    return this.http.get(ApiConstants.apiURL + ApiConstants.mainCategoryList);

   }
}
