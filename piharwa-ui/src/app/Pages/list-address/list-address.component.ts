import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListAddressService } from './list-address.service';
@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit {
  listAddress: any;

  constructor(public listAddressService: ListAddressService, public router: Router) { }

  ngOnInit(): void {
    this.getAddressList();
  }

  getAddressList() {
    this.listAddressService.addressDetailsApi().subscribe((data) => this.getAddressListApi(data));
  }

  getAddressListApi(data: any) {
    if (data.status === true) {
      // this.listAddress = data.data
      console.log(data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    }

  }

}
