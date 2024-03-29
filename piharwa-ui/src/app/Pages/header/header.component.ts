import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { CommonService } from '../common.service';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';
import { confirmDialog } from 'src/app/shared/dialog-box/confirm/confirm.component';
@Pipe({
  name: 'myPipe'
})
export class MyPipe {
  transform(val: any[]) {
      return val.filter(x => x > 1);
  }
}

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
  filterArr:any;
  piharwaCategories: any;
  constructor(public dialog: MatDialog, public cartService: CartService, public router: Router, public categoryService: CategoryService,
    public commonService: CommonService) { }

  openLoginWindow() {
    const dialogRef = this.dialog.open(LoginPageComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getAllCategoryList();
    this.cartData = this.cartService.getItemData()
    this.getProfileList();
  }

  getProfileList() {
    this.commonService.profileApi().subscribe((data) => this.profileDataList(data));
  }
  profileDataList(data: any) {
    if (data.status === true) {
      this.profileLData = data.data;
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
    if (data.status === true) {
      this.categoryDataList = data.data;
      console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr", this.categoryDataList)
    }
  }

  getAllCategoryDataList(data: any) {
    if (data.status === true) {
      this.allCategoryList = data.data;
      this.piharwaCategories= this.sliceIntoChunks(this.allCategoryList.piharwaCategories,3)
      this.filterArr= this.sliceIntoChunks(this.allCategoryList.elementCategories,3)
    }
  }

 sliceIntoChunks(arr:any, chunkSize:any) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
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
