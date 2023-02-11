import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { confirmDialog } from 'src/app/shared/dialog-box/confirm/confirm.component';
import { DeletePopupComponent } from '../../common-page/delete-popup/delete-popup.component';
import { CommonService } from '../../common.service';
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

  constructor(public listAddressService: ListAddressService, public commonService: CommonService,
    public router: Router, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAddressList();
  }

  getAddressList() {
    this.listAddressService.addressDetailsApi().subscribe((data) => this.getAddressListApi(data));
  }

  logout() {

    const dialogRef = this.dialog.open(confirmDialog, {
      data: {
        message: "Are you sure you want to logout?",
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });//end of dialog

  }
  getAddressListApi(data: any) {
    if (data.status === true) {
      this.address = data.data;
    }

  }
  openAddAdressWindow() {
    const dialogRef = this.dialog.open(AddAddresComponent, {
      width: '500px',
      height: '500px',
      data: {
        flag: 'save',
        value: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // //console.log('The dialog was closed');
      this.getAddressList();
    });
  }
  openEditAdressWindow(addressList: any) {
    const dialogRef = this.dialog.open(AddAddresComponent, {
      width: '500px',
      height: '500px',
      data: {
        flag: 'edit',
        value: addressList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // //console.log('The dialog was closed');
      this.getAddressList();
    });
  }
  makedefault(addressList: any) {
    addressList.default = true;
    addressList.addressId = addressList._id
    this.listAddressService.updateAddress(addressList).subscribe(
      (data) => this.saveResponse(data),
      (err) => console.log(err)
    );
  }
  saveResponse(data: any) {
    if (data.status === true) {
      this.commonService.openSnackBar(data.message, 'Dismiss');
      this.getAddressList();
    }
    if (data.status === false) {
      this.commonService.openSnackBar(data.message, 'Dismiss');
    }
  }

  deleteaddressWindow(addressList: any) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '200',
      height: '200',
      data: {
        header: 'delete address ?',
        body: 'are you sure want delete address'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // //console.log('The dialog was closed');
      if (result === 'yes') {
        this.deleteAddress(addressList);
      }
    });
  }
  deleteAddress(addressList: any) {
    addressList.default = true;
    // //console.log(addressList)
    this.listAddressService.deleteaddress(addressList._id).subscribe(
      (data) => this.saveResponse(data),
      (err) => console.log(err)
    );
  }
}
