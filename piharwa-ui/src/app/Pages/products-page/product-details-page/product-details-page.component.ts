import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../product-list/product.service';
import { CartService } from './cart-service/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { confirmDialog } from 'src/app/shared/dialog-box/confirm/confirm.component';
import { messageDialog } from 'src/app/shared/dialog-box/message/message.component';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  public quantity: number = 1;
  imageObject = [{}];

  id!: any;
  productData: any;
  items: any;
  cartData: any;

  constructor(private route: ActivatedRoute, public productService: ProductService, private cartService: CartService, public myRoute: Router,
    private commonService: CommonService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.cartData = this.cartService.getItemData();
    this.getProductDetials(id);
    // this.items = this.cartService.getItems();
  }

  getProductDetials(id: any) {
    this.productService.productDetialsApi(id).subscribe((data) => this.getProductdetialsApi(data));
  }
  getProductdetialsApi(data: any) {
    if (data.status === true) {
      this.productData = data.data
      this.productData.thumbnailImgs.forEach((element: any) => {
        let obj = {
          image: element,
          thumbImage: element,
          title: ''
        }
        this.imageObject.unshift(obj)
      });
    }
  }

  increment() {
    if (this.quantity === 4) {
      this.commonService.openSnackBar("You can add maximum 4 quantity", 'Dismiss');
    }
    else {
      this.quantity += 1;
    }
  }

  decrement() {
    if (this.quantity === 0) {
      this.quantity = 0
    } else {
      this.quantity -= 1;
    }
  }

  reset() {
    this.quantity = 0;
  }

  addtoCart(productData: any): any {

    if(this.cartData.length >= 3 ){
      this.commonService.openSnackBar("You can add maximum 3 product in a cart", 'Dismiss');
      return;
    }

    if (!productData.productDetails[0].stockAvailability) {
      this.dialog.open(messageDialog, {
        data: {
          message: "Stock is not available. Please try after some time."
        }
      });
      return false;
    }

    if (localStorage.getItem('LoggedInUser')) {
      this.cartService.addToCartOnBackend({
        "productDetails": [
          {
            "productId": productData._id,
            "quantity": this.quantity,
            "sizes": productData.productDetails[0].sizes
          }
        ]
      }).subscribe((response: any) => {

        if (response.status) {
          let totalvalue = this.productData.price * this.quantity
          let productdata = {
            _id: productData._id,
            // productCategoryID: productData.productCategoryID,
            productTitle: productData.productTitle,
            price: productData.price,
            quantity: this.quantity,
            total: totalvalue,
            pimage: productData.productImg,
            sizes: productData.productDetails[0].sizes
          }
          this.cartService.addProductToCart(productdata);
          this.myRoute.navigate(["/product-cart"]);
        }
        else {
          this.dialog.open(messageDialog, {
            data: {
              message: response.message
            }
          });
        }
      });
    } else {
      let totalvalue = this.productData.price * this.quantity
          let productdata = {
            _id: productData._id,
            // productCategoryID: productData.productCategoryID,
            productTitle: productData.productTitle,
            price: productData.price,
            quantity: this.quantity,
            total: totalvalue,
            pimage: productData.productImg,
            sizes: productData.productDetails[0].sizes
          }
          this.cartService.addProductToCart(productdata);
          this.myRoute.navigate(["/product-cart"]);
    }
  }

  // deleteItem(item:any){
  //   this.cartService.deleteItem(item);
  //   let domItem  = document.getElementById(`cart-item`+item.product.id);
  //   setTimeout(() =>{
  //   domItem.classList.add('delete-style');
  //   domItem.parentNode.removeChild(domItem);
  //   },1000);

  // }
  addQty(item: any) {
  }

}
// routerLink="/product-cart"