import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: any;
  listId: any;

  constructor(public productService :ProductService, public router :Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.route.params.subscribe(params => {
      this.listId = params['id'];
      console.log('The id of this route is: ', this.listId);
      this.getProductList(id);

    });
  }

  
  getProductList(id:any) {
    let productdata={
      "page_no": 1,
      "no_record": 10,
      "productCategoryID": '',
      "searchText": '',
      "rootCatId":this.listId
    }
    this.productService.productListApi(productdata).subscribe((data) => this.getProductListApi(data));
  }
  getProductListApi(data:any){
    if(data.status === true){
      this.productList = data.data.productList
      console.log(this.productList);
    }

  }
  gotoDetailProduct(id:any): void {
    this.router.navigate(['/product-details',id]);
  }
}
