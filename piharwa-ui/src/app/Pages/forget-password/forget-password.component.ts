import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

 
  loginFlag:boolean= true;
  registerFlag:boolean =false;
  otpFlag:boolean= false;
  loginData: any;
  sginupForm!: FormGroup;
  loginForm!: FormGroup;
  verifyOtpFlag: boolean = false;
  previousUrl:any;


  constructor( 
    private formBuilder: FormBuilder, private snackBar: MatSnackBar,public dialog: MatDialog,
    private myRoute: Router,
    private dataService: LoginService,
    private activatedRoute : ActivatedRoute,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) data:any) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.forgetFormData();
  }
  
  
  private forgetFormData() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      })
    });

  }

  requestOtp(){

  }


  ErrorMessage(value: any) {
    return 'Please Enter ' + value;
  }


  sendOtp(){
    let userData = {
      username: this.loginForm['controls']['username'].value,
    };
    // //console.log(userData,'aaa');
      this.dataService.loginApi(userData).subscribe(
        (data) => this.otpDialog(data,userData),
        (err) => console.log(err)
      );
  }

  otpDialog(data:any,name:any){
   //console.log(data)
   this.verifyOtpFlag = true;
  }
  verifyOtp(){
    let userData = {
      username: this.loginForm['controls']['username'].value,
      otpToken:this.loginForm['controls']['otptoken'].value,
    };
    this.dataService.otpTokenApi(userData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
    this.sginupForm.reset();
  }


  closeDialog(data: any) {
    if (data.status === true) {
      this.loginFlag = true;
      this.registerFlag = false;
    }
  }
  onForgetPassword() {
    let userData = this.loginForm.value;
    // //console.log(userData);
      this.dataService.loginApi(userData).subscribe(
        (data) => this.logindialog(data),
        (err) => console.log(err)
      );
  }

  logindialog(data: any) {
  }

}