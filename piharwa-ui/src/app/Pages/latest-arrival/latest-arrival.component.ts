import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LatestArrivalService } from './latest-arrival.service';

@Component({
  selector: 'app-latest-arrival',
  templateUrl: './latest-arrival.component.html',
  styleUrls: ['./latest-arrival.component.scss']
})
export class LatestArrivalComponent {
  latestArrivalProduct: any;

  constructor(public latestArrivalService: LatestArrivalService, public router: Router) { }

  ngOnInit(): void {
    this.getLatestProductList();
  }

  getLatestProductList() {
    this.latestArrivalService.latestArrivalListApi().subscribe((data) => this.getLatestProductsList(data));
}
getLatestProductsList(data:any){
  if (data.status === true) {
    this.latestArrivalProduct = data.data
    console.log(this.latestArrivalProduct,"==========latestArrival");
  }

}

}
