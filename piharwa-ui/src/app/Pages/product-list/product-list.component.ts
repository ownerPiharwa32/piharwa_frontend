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
  searchText:any='';
  id:any;
  constructor(public productService :ProductService, public router :Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id)
    this.route.params.subscribe(params => {
      this.listId = params['id'];
      // console.log('The id of this route is: ', this.listId);
      this.getProductList(this.id,this.searchText);

    });
  }

  
  getProductList(id:any,searchText:any) {
    let productdata={
      "page_no": 1,
      "no_record": 10,
      "productCategoryID": '',
      "searchText": searchText?searchText:'',
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
  applyFilter(){
  console.log(this.searchText);
  this.getProductList(this.id,this.searchText);

  }
  clear(){
    this.getProductList(this.id,'');
  }
}
