import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeaturedProductService } from './featured-product.service';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent  {
    featuredProduct: any;

    constructor(public featuredproductService: FeaturedProductService, public router: Router) { }
    
    ngOnInit(): void {
        this.getProductList();
    }

    getProductList() {
        this.featuredproductService.featuredproductListApi().subscribe((data) => this.getProductListApi(data));
    }
    
    getProductListApi(data:any){
        if (data.status === true) {
          this.featuredProduct = data.data
          console.log(this.featuredProduct);
        }
    
      }


//   imageObject = [{
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
//     title: 'Hummingbirds are amazing creatures'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
//     title: 'Example with title.'
// },{
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
//     title: 'Hummingbirds are amazing creatures'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
//     title: 'Example two with title.'
// }];
}
