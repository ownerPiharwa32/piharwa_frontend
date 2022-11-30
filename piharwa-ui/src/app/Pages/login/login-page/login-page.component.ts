import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginFlag:boolean= true;
  registerFlag:boolean =false;
  otpFlag:boolean= false;
  loginData: any;
  sginupForm!: FormGroup;
  loginForm!: FormGroup;
  verifyOtpFlag: boolean = false;


  constructor( private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private myRoute: Router,
    private dataService: LoginService,
    public authService: AuthService,
    private activatedRoute : ActivatedRoute,
    public dialogRef: MatDialogRef<LoginPageComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.singupForm();
    this.loginFormData();
    this.verifyOtpFlag = false;
  }

   checkPage(flag:any){
    if(flag ==='login'){
      this.loginFlag = true;
      this.registerFlag = false;
      this.otpFlag =false;
    }
    if(flag ==='singup'){
      this.loginFlag = false;
      this.registerFlag = true;
      this.otpFlag =false;
    }
    if(flag ==='otp'){
      this.loginFlag = false;
      this.registerFlag = false;
      this.otpFlag =true;
    }
  }

  private singupForm() {
    this.sginupForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      mobileNo: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      emailId: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),

    });
    // if(this.updateFlag === true){
    //   this.sginupForm.controls['name'].setValue(this.updateValue.name);
    // }
  }

  private loginFormData() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      otptoken: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar'],
    });
  }

  ErrorMessage(value: any) {
    return 'Please Enter ' + value;
  }
  requestOtp(){
   
  }

  sendOtp(){
    let userData = {
      username: this.loginForm['controls']['username'].value,
    };
    // console.log(userData,'aaa');
      this.dataService.loginApi(userData).subscribe(
        (data) => this.otpDialog(data,userData),
        (err) => console.log(err)
      );
  }

  otpDialog(data:any,name:any){
   console.log(data)
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

  onSignup() {
    // let userData = {
    //   name: this.sginupForm['controls']['name'].value,
    // };
    let userData =this.sginupForm.value;
    this.dataService.registerApi(userData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
    this.sginupForm.reset();
  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.loginFlag = true;
      this.registerFlag = false;
      this.openSnackBar(data.message, 'Dismiss');
    }
    if (data.status === false) {
      this.openSnackBar(data.message, 'Dismiss');
    }
  }
  onLogin() {
    let userData = this.loginForm.value;
    console.log(userData);
      this.dataService.loginApi(userData).subscribe(
        (data) => this.logindialog(data),
        (err) => console.log(err)
      );
  }

  logindialog(data: any) {
    if (data.status === true) {
      console.log(data)
      this.loginData = data;
      this.openSnackBar(data.message, 'Dismiss');
      this.loginForm.reset();
      this.authService.sendToken( this.loginData.accessToken);
      this.close()
      this.myRoute.navigateByUrl('/home');
    }
    if (data.status === false) {
      this.openSnackBar(data.message, 'Dismiss');
    }
  }
}