import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
    imageSrc = 'assets/img/products2.png'  ;
    imageSrc2 = 'assets/img/gallery1.png'  
    image3='assets/img/product.jpeg';
  constructor() { }

  ngOnInit(): void {
  }
  imageObject = [{
    image: 'ass',
    thumbImage: this.imageSrc2,
    title: 'Hummingbirds are amazing creatures'
}, {
    image: this.imageSrc,
    thumbImage:  this.imageSrc,
}, {
    image: this.imageSrc,
    thumbImage: this.imageSrc,
    title: 'Example with title.'
},{
    image: this.imageSrc,
    thumbImage:  this.image3,
    title: 'Hummingbirds are amazing creatures'
}, {
    image: this.imageSrc,
    thumbImage:  this.imageSrc2,
}, {
    image: this.imageSrc,
    thumbImage:  this.image3,
    title: 'Example two with title.'
}];
}
