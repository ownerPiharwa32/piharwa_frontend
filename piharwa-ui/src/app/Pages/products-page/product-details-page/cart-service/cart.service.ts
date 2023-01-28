import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiConstants } from 'src/app/api-path/api-config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  tempData = [{
    productTitle: '',
  }];
  private sampleData = new BehaviorSubject<any[]>([]);
  sampleData$ = this.sampleData.asObservable();
  productArray = []


  constructor(
    private http: HttpClient
  ) { }

  addToCartOnBackend(data: any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.addToCart, data);
  }

  updateCartOnBackend(data: any) {
    return this.http.put(ApiConstants.apiURL + ApiConstants.updateCart, data);
  }

  getCartDataFromBackend() {
    return this.http.get(ApiConstants.apiURL + ApiConstants.getCartList);
  }

  deleteFromCartOnBackend(productId: any) {
    return this.http.delete(ApiConstants.apiURL + ApiConstants.deleteFromCart + productId);
  }


  addProductToCart(data: any) {
    // console.log(data)
    let item = data;
    if (this.getItemData() === null) {
      let cart = [];
      cart.push(item);
      localStorage.setItem('userCart', JSON.stringify(cart));
    } else {
      let cart: any = this.getItemData();
      let index = -1;
      for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        if (item._id === data._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        cart.push(item);
        localStorage.setItem('userCart', JSON.stringify(cart));
      } else {
        let item = cart[index];
        item.quantity++;
        cart[index] = item;
        localStorage.setItem('userCart', JSON.stringify(cart));
      }
    }
    this.subtotal();
  }

  getItemData() {
    var value = localStorage.getItem('userCart');
    return (value && JSON.parse(value)) || [];
  }

  subtotal() {
    let totalPrice = 0;
    let cart: any = this.getItemData();
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].total;
    }
    totalPrice = totalPrice;
    // console.log(totalPrice);
    localStorage.setItem('subtotal', JSON.stringify(totalPrice));
  }

  getsubtotalData() {
    var value = localStorage.getItem('subtotal');
    return value && JSON.parse(value);
  }

  // deleteItemData(data:any) {
  //   this.tempData = this.tempData.filter(element => {
  //     if (element.productTitle === data.productTitle) {
  //       element.productTitle = '';
  //     }
  //     return element.productTitle !== data.productTitle;
  //   });
  //   this.sampleData.next(this.tempData);
  // }
  clearData() {
    this.tempData.forEach(element => {
      element.productTitle = '';
    });
    this.tempData = [];
    this.sampleData.next(this.tempData);
  }
  //   product: any;
  //   items: any;

  //   cart = [];
  //   itemsInCart :any= [];

  //   constructor() { }
  //   addToCart(product: any) {

  //     console.log(product)
  //      let local_storage :any= localStorage.getItem('cart');
  //      let localdata = JSON.parse(local_storage);
  //     console.log(localdata)
  //      if(localdata === null || localdata.length ===0){
  //       this.itemsInCart.push(product);
  //       localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  //     }
  //      else{

  //      console.log("LOCAL STORAGE HAS ITEMS",localdata);
  //      localdata.forEach((ele: { _id: any; })=> {
  //       console.log(ele._id);
  //       console.log(product._id )
  //       if(product._id === ele._id){
  //       console.log('nothing' )

  //       }
  //       else{
  //         alert()
  //         this.itemsInCart.push(product);
  //         localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  //       }

  //      });

  //     // for(var i in localdata)
  //     // {
  //     //   console.log(localdata[i]._id);
  //     //   if(product._id !== localdata[i]._id){
  //     //     this.this.itemsInCart.push(product);
  //     //     localStorage.setItem('cart', JSON.stringify(this.this.itemsInCart));
  //     //     break;
  //     //   }
  //     // }

  //   }
  //   // this.this.itemsInCart.push(product);
  //   // localStorage.setItem('cart', JSON.stringify(this.this.itemsInCart));

  // }
  //     // }
  //     // if(this.items){
  //     //   this.itemsInCart.push(this.items);
  //     // }
  //   //    items.push(product);

  //   //   // product.forEach(function (item:any){
  //   //   //   this.itemsInCart.push(item);
  //   //   // })
  //   //   console.log(this.this.itemsInCart)
  //   //   localStorage.setItem('cart', JSON.stringify(this.this.itemsInCart));
  //   // }
  //   // getItems(){
  //   //  console.log("Cart: ", localStorage.getItem("cart"));
  //   //  return this.items = localStorage.getItem("cart");
  //   //  //return this.items = 

  deleteItem(item: any) {
    // console.log("Deleting : ",item);
    let shopping_cart = this.getItemData();
    let index;
    for (let i in shopping_cart) {
      if (item._id == shopping_cart[i]._id) {
        index = i;
        console.log(index);
      }
    }
    shopping_cart.splice(index, 1);
    // console.log("shopping_cart ", shopping_cart);
    localStorage.setItem('userCart', JSON.stringify(shopping_cart));
    this.subtotal();

  }
  //   
  //   addQty(item: any) {
  //      console.log(item)
  //     let shopping_cart:any;
  //     shopping_cart = localStorage.getItem('cart');
  //     for(let i in shopping_cart){
  //       if(item.product.name == shopping_cart[i].product.name){
  //         shopping_cart[i].quantity +=1;
  //         item = null;
  //         break;
  //       }
  //     }
  //     localStorage.setItem('cart', JSON.stringify(shopping_cart));

  //   }
  //   numberOfItems(){
  //     this.itemsInCart = localStorage.getItem('cart');
  //     // return this.itemsInCart.length;
  //   }
  //   clearCart(){
  //     localStorage.clear();
  //   }

  // }

}