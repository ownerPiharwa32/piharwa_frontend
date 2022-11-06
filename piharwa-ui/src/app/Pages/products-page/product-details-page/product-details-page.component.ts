import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  public counter: number = 1;

  constructor() { }

  ngOnInit(): void {
  }
  
  increment() {
    this.counter += 1;
  }

  decrement() {
    if(this.counter === 0){
          this.counter=0
    }else {
        this.counter -= 1;
    }
  }

  reset() {
    this.counter = 0;
  }
}
