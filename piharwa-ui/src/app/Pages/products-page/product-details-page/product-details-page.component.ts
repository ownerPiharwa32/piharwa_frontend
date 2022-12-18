import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../product-list/product.service';
import { CartService } from './cart-service/cart.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  public quantity: number = 1;

  id!:any;
  productData: any;
  items: any;
  constructor(private route: ActivatedRoute,public productService :ProductService,private cartService: CartService,public myRoute :Router) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.getProductDetials(id);
    // this.items = this.cartService.getItems();
  }
  
  getProductDetials(id:any) {
    this.productService.productDetialsApi(id).subscribe((data) => this.getProductdetialsApi(data));
  }
  getProductdetialsApi(data:any){
    if(data.status === true){
      this.productData = data.data
      console.log(this.productData);
    }
  }

  increment() {
    this.quantity += 1;
  }

  decrement() {
    if(this.quantity === 0){
          this.quantity=0
    }else {
        this.quantity -= 1;
    }
  }

  reset() {
    this.quantity = 0;
  }

  addtoCart(productData:any){
   console.log(productData)
  let totalvalue= this.productData.price*this.quantity
  console.log(totalvalue)
   let productdata ={
    _id :productData._id,
    productTitle:productData.productTitle,
    price:productData.price,
    quantity:this.quantity,
    total:totalvalue,
    pimage:productData.productImg
   }
   this.cartService.addProductToCart(productdata);
   this.myRoute.navigate(["/product-cart"]);
  }
  // deleteItem(item:any){
  //   this.cartService.deleteItem(item);
  //   let domItem  = document.getElementById(`cart-item`+item.product.id);
  //   setTimeout(() =>{
  //   domItem.classList.add('delete-style');
  //   domItem.parentNode.removeChild(domItem);
  //   },1000);

  // }
  addQty(item:any){
  }
}
// routerLink="/product-cart"