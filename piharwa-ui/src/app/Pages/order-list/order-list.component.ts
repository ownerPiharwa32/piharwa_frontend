import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListAddressService } from '../add-adress-contact/list-address/list-address.service';
import { AddAddresComponent } from '../add-adress-contact/manage-address/add-addres/add-addres.component';
import { DeletePopupComponent } from '../common-page/delete-popup/delete-popup.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  listAddress: any;
  address: any;

  constructor(public listAddressService: ListAddressService, public commonService:CommonService,
    public router: Router,public dialog: MatDialog,) { }

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
      // console.log('The dialog was closed');
      this.getAddressList();
    });  
}
openEditAdressWindow(addressList:any) {
  const dialogRef = this.dialog.open(AddAddresComponent, {
    width: '500px',
    height:'500px',
    data:{ 
      flag:'edit',
      value:addressList
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed');
    this.getAddressList();
  });  
}
makedefault(addressList:any){
addressList.default = true;
// console.log(addressList)
this.listAddressService.updateAddress(addressList).subscribe(
  (data: any) => this.saveResponse(data),
  (err: any) => console.log(err)
);
 }
saveResponse(data:any){
 if (data.status === true) {
  this.commonService.openSnackBar(data.message, 'Dismiss');
  this.getAddressList();
 }
if (data.status === false) {
  this.commonService.openSnackBar(data.message, 'Dismiss');
  }
 }

 deleteaddressWindow(addressList:any) {
  const dialogRef = this.dialog.open(DeletePopupComponent, {
    width: '200',
    height:'200',
    data:{ 
      header:'delete address ?',
      body:'are you sure want delete address'
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed');
    if(result === 'yes'){
      this.deleteAddress(addressList);
    }
  });  
 }
 deleteAddress(addressList:any){
  addressList.default = true;
  // console.log(addressList)
  this.listAddressService.deleteaddress(addressList._id).subscribe(
    (data: any) => this.saveResponse(data),
    (err: any) => console.log(err)
   );
   }
}