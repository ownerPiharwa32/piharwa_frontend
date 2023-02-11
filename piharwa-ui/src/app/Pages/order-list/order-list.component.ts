import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderListService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderDetails: any;
  constructor(public orderListService: OrderListService,
    public router: Router) { }

  ngOnInit(): void {
    this.getOrderListDetails();
  }

  getOrderListDetails() {
    this.orderListService.ordersListApi({
      "page_no": 1,
      "no_record": 10,
    }).subscribe((data) => this.getOrderListApi(data));
  }

  getOrderListApi(data: any) {
    if (data.status === true) {
      //console.log(data.data,"order DAta")
      this.orderDetails = data.data;
    } 
  }
}
