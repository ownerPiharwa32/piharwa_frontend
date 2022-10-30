import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    imageObject = [{
        image: '../../../assets/img/gal1.png',
        thumbImage: '../../../assets/img/gal1.png',
        title: 'Product Slider'
    }, {
        image: '../../../assets/img/gal2.png',
        thumbImage: '../../../assets/img/gal2.png',
        title: 'Product Slider'
    }, {
        image: '../../../assets/img/gal3.png',
        thumbImage: '../../../assets/img/gal3.png',
        title: 'Product Slider'
    }, {
        image: '../../../assets/img/gal4.png',
        thumbImage: '../../../assets/img/gal4.png',
        title: 'Product Slider'
    }, {
        image: '../../../assets/img/gal5.png',
        thumbImage: '../../../assets/img/gal5.png',
        title: 'Product Slider'
    }, {
        image: '../../../assets/img/gal6.png',
        thumbImage: '../../../assets/img/gal6.png',
        title: 'Product Slider'
    }];
}
