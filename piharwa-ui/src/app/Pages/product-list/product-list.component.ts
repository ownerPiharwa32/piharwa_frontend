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
  searchText: any = '';
  id: any;
  categoryId: string | undefined;
  title: string | undefined;
  pageSize = 10;
  totalPages = 0;
  activePage = 1;
  productSort = 0;

  constructor(
    public productService: ProductService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id)
    this.route.params.subscribe((params: any) => {
      this.listId = params['id'];
      this.categoryId = params['categoryId'];
      // console.log('The id of this route is: ', this.listId);
      this.getProductList();
    });
  }

  onSelectedCategory(category: any) {
    this.title = category.title;
    this.categoryId = category._id;
    this.getProductList();
  }

  abc = [1,2,3,4,5,6,7,8]

  pageSearch() { }

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
