import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-list/product.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  public counter: number = 1;

  id!:any;
  productData: any;
  constructor(private route: ActivatedRoute,public productService :ProductService) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.getProductDetials(id);
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
