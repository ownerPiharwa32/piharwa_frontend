import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAdressContactComponent } from '../add-adress-contact.component';
import { AddAddresComponent } from '../manage-address/add-addres/add-addres.component';
import { ListAddressService } from './list-address.service';
@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit {
  listAddress: any;
  address: any;

  constructor(public listAddressService: ListAddressService, public router: Router,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAddressList();
  }

  getAddressList() {
    this.listAddressService.addressDetailsApi().subscribe((data) => this.getAddressListApi(data));
  }

  getAddressListApi(data: any) {
    if (data.status === true) {
      this.address =data.data;
    }

  }
  openAddAdressWindow() {
    const dialogRef = this.dialog.open(AddAddresComponent, {
      width: '500px',
      height:'500px',
      data:{ 
        flag:'save',
        value:''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });  
}
openEditAdressWindow() {
  const dialogRef = this.dialog.open(AddAddresComponent, {
    width: '500px',
    height:'500px',
    data:{ 
      flag:'edit',
      value:''
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });  
}
}
