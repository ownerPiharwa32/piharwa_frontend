import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categoryDataList: any;


  cartData: any;

  constructor(public dialog: MatDialog,public cartService :CartService,public router :Router,public categoryService:CategoryService) {}

  openLoginWindow() {
      const dialogRef = this.dialog.open(LoginPageComponent, {
        width: '700px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.cartData = this.cartService.getItemData()
    console.log(JSON.stringify(this.cartData));
  }

  getCategoryList() {
    this.categoryService.mainCategoryListApi().subscribe((data) => this.getCategoryDataList(data));
  }
  getCategoryDataList(data:any){
    console.log(data)
    if(data.status === true){
      this.categoryDataList= data.data;
      console.log(this.categoryDataList)
    }
  }
  categoryList(id:any){
    console.log(id)
      this.router.navigate(['/productlist',id]);
    }
}
