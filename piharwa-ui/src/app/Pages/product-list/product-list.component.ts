import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { CommonService } from '../common.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: any;
  listId: any;
  searchText: any = '';
  id: any;
  categoryId: string | undefined;
  title: string | undefined;
  pageSize = 12;
  totalPages = 0;
  activePage = 1;
  productSort = 0;
  previousUrl: any;
  routeLengthCheck: any;

  constructor(
    public productService: ProductService,
    public router: Router,
    private route: ActivatedRoute,public commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      this.listId = params['id'];
      this.categoryId = params['categoryId'];
      this.getProductList();
    });
    this.commonService.previousUrl$.subscribe((previousUrl: string) => {
      console.log('previous url: ', previousUrl);
      this.previousUrl = previousUrl;
    });
     let lengthRoute= this.previousUrl .split('/');
     let routeArr=[];
     routeArr.push(lengthRoute);
     this.routeLengthCheck =routeArr[0].length
     console.log(routeArr)

     console.log(this.routeLengthCheck)
  }

  onSelectedCategory(category: any) {
    this.title = category.title;
    this.categoryId = category._id;
    this.getProductList();
  }
 
  getProductList() {
    this.productService.productListApi({
      "page_no": this.activePage,
      "no_record": this.pageSize,
      "productCategoryID": this.categoryId ? this.categoryId : '',
      "searchText": this.searchText ? this.searchText : '',
      "rootCatId": this.listId,
      "productSort": this.productSort
    }).subscribe((data: any) => {
      if (data.status === true) {
        this.productList = data.data.productList;
        this.totalPages = data.data.total_pages;
      }
    });
  }

  gotoDetailProduct(id: any): void {
    this.router.navigate(['/product-details', id]);
  }

  sortProducts(event: any) {
    this.productSort = event.target.value
    this.getProductList();
  }


  applyFilter() {
    this.getProductList();

  }

  clear() {
    this.searchText = '';
    this.getProductList();
  }
}
