import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { CommonService } from '../common.service';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';
import { confirmDialog } from 'src/app/shared/dialog-box/confirm/confirm.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categoryDataList: any;
  allCategoryList: any;

  cartData: any;
  profileLData: any;

  constructor(public dialog: MatDialog, public cartService: CartService, public router: Router, public categoryService: CategoryService,
    public commonService: CommonService) { }

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
    this.getAllCategoryList();
    this.cartData = this.cartService.getItemData()
    console.log('cartData ', JSON.stringify(this.cartData));
    this.getProfileList();
  }

  getProfileList() {
    this.commonService.profileApi().subscribe((data) => this.profileDataList(data));
  }
  profileDataList(data: any) {
    // console.log(data)
    if (data.status === true) {
      this.profileLData = data.data;
      // console.log(this.profileLData);
      this.commonService.ProfileDataAll = this.profileLData;
      this.commonService.ProfileData.emit(this.profileLData)
    }
  }

  getCategoryList() {
    this.categoryService.mainCategoryListApi().subscribe((data) => this.getCategoryDataList(data));
  }

  getAllCategoryList() {
    this.categoryService.allCategoryListApi().subscribe((data) => this.getAllCategoryDataList(data))
  }

  getCategoryDataList(data: any) {
    console.log(data)
    if (data.status === true) {
      this.categoryDataList = data.data;
      console.log(this.categoryDataList)
    }
  }


  getAllCategoryDataList(data: any) {
    console.log(data)
    if (data.status === true) {
      this.allCategoryList = data.data;
      console.log(this.allCategoryList,"======================================a")
    }
  }

  openCart() {
    if (this.cartData) {
      this.router.navigate(['/product-cart']);
    }
  }

  logout() {

    const dialogRef = this.dialog.open(confirmDialog, {
      data: {
        message: "Are you sure you want to logout?",
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });//end of dialog


  }


}
