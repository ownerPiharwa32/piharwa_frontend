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

  constructor( private formBuilder: FormBuilder,public commonService:CommonService,
    private activatedRoute : ActivatedRoute,
    private dataService: ListAddressService,
    public dialogRef: MatDialogRef<AddAddresComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
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
    // if(this.updateFlag === true){
    //   this.sginupForm.controls['name'].setValue(this.updateValue.name);
    // }
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
      console.log(data)
      this.commonService.openSnackBar(data.message, 'Dismiss');
      this.addressForm.reset();
    }
    if (data.status === false) {
      this.commonService.openSnackBar(data.message, 'Dismiss');
    }
  }
}
