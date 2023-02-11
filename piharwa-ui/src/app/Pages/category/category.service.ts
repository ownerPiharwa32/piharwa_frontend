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
  categoryListApi (productlistId:any,categoryId:any) {
    return this.http.get(ApiConstants.apiURL + ApiConstants.categorylist+'/'+productlistId+'/'+categoryId);
   }
   mainCategoryListApi(){
    return this.http.get(ApiConstants.apiURL + ApiConstants.mainCategoryList);

  }
  
  allCategoryListApi() {
    return this.http.get(ApiConstants.apiURL + ApiConstants.allcategoryList)
  }
}
