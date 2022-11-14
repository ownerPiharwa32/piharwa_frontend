import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  public counter: number = 1;

  id!:any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
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
