import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Pages/common.service';
import { ListAddressService } from '../../list-address/list-address.service';

@Component({
  selector: 'app-add-addres',
  templateUrl: './add-addres.component.html',
  styleUrls: ['./add-addres.component.scss']
})
export class AddAddresComponent implements OnInit {
  addressForm!: FormGroup;
  flag: any;

  constructor( private formBuilder: FormBuilder,public commonService:CommonService,
    private activatedRoute : ActivatedRoute,
    private dataService: ListAddressService,
    public dialogRef: MatDialogRef<AddAddresComponent>,
    @Inject(MAT_DIALOG_DATA) public addressdata:any) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log(this.addressdata);
    this.flag = this.addressdata.flag;
    this.addressCall()

  }
 
  public addressCall() {
    this.addressForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      address_line_one: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      address_line_two: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      landmark: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      city: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      state: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      country: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      pincode: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      mobileNo: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });
    if(this.flag === 'edit'){
      console.log(this.addressdata.value.firstName)
      this.addressForm.controls['firstName'].setValue(this.addressdata.value.firstName);
      this.addressForm.controls['lastName'].setValue(this.addressdata.value.lastName);
      this.addressForm.controls['address_line_one'].setValue(this.addressdata.value.address_line_one);
      this.addressForm.controls['address_line_two'].setValue(this.addressdata.value.address_line_two);
      this.addressForm.controls['landmark'].setValue(this.addressdata.value.landmark);
      this.addressForm.controls['city'].setValue(this.addressdata.value.city);
      this.addressForm.controls['state'].setValue(this.addressdata.value.state);
      this.addressForm.controls['country'].setValue(this.addressdata.value.country);
      this.addressForm.controls['pincode'].setValue(this.addressdata.value.pincode);
      this.addressForm.controls['mobileNo'].setValue(this.addressdata.value.mobileNo);

    }
  }
  addAddress() {
    let userData = this.addressForm.value;
    console.log(userData);
      this.dataService.saveAddress(userData).subscribe(
        (data) => this.saveResponse(data),
        (err) => console.log(err)
      );
  }

  saveResponse(data: any) {
    if (data.status === true) {
      this.commonService.openSnackBar(data.message, 'Dismiss');
      this.dialogRef.close('yes');
      this.addressForm.reset();
    }
    if (data.status === false) {
      this.commonService.openSnackBar(data.message, 'Dismiss');
      this.dialogRef.close('yes');
    }
  }

  updateAddress() {
    let userData = this.addressForm.value;
    userData.addressId = this.addressdata.value._id;
    userData.default = true;
    console.log(userData);
      this.dataService.updateAddress(userData).subscribe(
        (data) => this.saveResponse(data),
        (err) => console.log(err)
      );
  }
}
