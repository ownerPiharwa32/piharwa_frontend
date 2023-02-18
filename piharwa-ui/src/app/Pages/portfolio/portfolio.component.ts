import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortFolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  homeDecorProduct: any;
  constructor(public portfolioService: PortFolioService, public router: Router) { }

  ngOnInit(): void {
    this.getHomeDecorList();
  }

  gotoDetailProduct(id: any): void {
    this.router.navigate(['/product-details', id]);
  }

  getHomeDecorList() {
    this.portfolioService.homeDecorListApi().subscribe((data) => this.getProductListApi(data));
  }

  getProductListApi(data: any) {
    if (data.status === true) {
      this.homeDecorProduct = data.data
      console.log(this.homeDecorProduct,"home Decor Products")

    }

  }


}
