import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonService } from '../../common.service';
import { LoginService } from '../login.service';
import { CartService } from '../../products-page/product-details-page/cart-service/cart.service';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginFlag: boolean = true;
  registerFlag: boolean = false;
  otpFlag: boolean = false;
  loginData: any;
  sginupForm!: FormGroup;
  loginForm!: FormGroup;
  verifyOtpFlag: boolean = false;
  previousUrl: any;
  validation={
    phoneRegex: /\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    emailPhone:/^(?:\d{10}|\w+@\w+\.\w{2,3})$/
   }
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private myRoute: Router,
    private dataService: LoginService,
    public cartService: CartService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<LoginPageComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.singupForm();
    this.loginFormData();
    this.verifyOtpFlag = false;
    this.commonService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl;
    });
  }

  checkPage(flag: any) {
    if (flag === 'login') {
      this.loginFlag = true;
      this.registerFlag = false;
      this.otpFlag = false;
    }
    if (flag === 'singup') {
      this.loginFlag = false;
      this.registerFlag = true;
      this.otpFlag = false;
    }
    if (flag === 'otp') {
      this.loginFlag = false;
      this.registerFlag = false;
      this.otpFlag = true;
    }
  }

  private singupForm() {
    this.sginupForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      mobileNo: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55), Validators.pattern(this.validation.phoneRegex),],
        updateOn: 'change',
      }),
      emailId: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55),Validators.email],
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
        validators: [Validators.required, Validators.maxLength(55), Validators.pattern(this.validation.emailPhone)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      otptoken: new FormControl('', {
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
  requestOtp() {}

  sendOtp() {
    let userData = {
      username: this.loginForm['controls']['username'].value,
    };
    if(userData.username.length>0){
   // //console.log(userData,'aaa');
   this.dataService.loginApi(userData).subscribe(
    (data) => this.otpDialog(data, userData),
    (err) => console.log(err)
  );
    }
    else{
    this.openSnackBar('Please Enter The Vaild Email Id / Mobile Number', 'Dismiss');
    }
 
  }
 

  otpDialog(data: any, name: any) {
    //console.log(data)
    this.verifyOtpFlag = true;
  }
  verifyOtp(otpToken:any) {
    let userData = {
      username: this.loginForm['controls']['username'].value,
      otpToken: otpToken
    };
    if(userData.otpToken.length>0){
      this.dataService.otpTokenApi(userData).subscribe(
        (data: any) => this.closeDialog1(data),
        (err: any) => console.log(err)
      );
     this.sginupForm.reset();

    }
  
    else{
    this.openSnackBar('Please Enter The Vaild OTP', 'Dismiss');

    }

  }
  closeDialog1(data:any){
    console.log(data)
    }
 
  onSignup() {
    // let userData = {
    //   name: this.sginupForm['controls']['name'].value,
    // };
    let userData = this.sginupForm.value;
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
    // //console.log(userData);
    this.dataService.loginApi(userData).subscribe(
      (data) => this.logindialog(data),
      (err) => console.log(err)
    );
  }

  logindialog(data: any) {
    if (data.status === true) {
      //console.log(data)
      this.loginData = data;
      this.openSnackBar(data.message, 'Dismiss');
      this.loginForm.reset();
      this.authService.sendToken(this.loginData.accessToken);
      window.location.reload();
      this.close();
      let cartData = this.cartService.getItemData();
      if (cartData.length > 0) {
        this.addProductsToCart(cartData);
      } else {
        this.myRoute.navigateByUrl(this.previousUrl);
      }
    }
    if (data.status === false) {
      this.openSnackBar(data.message, 'Dismiss');
    }
  }

  onForgetPassword() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      data: {
        message: 'Are you sure you want to logout?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {}); //end of dialog
  }

  addProductsToCart(cartData: any) {
    let sendData: { productId: any; quantity: any; sizes: any }[] = [];
    cartData.forEach((element: any) => {
      sendData.push({
        productId: element._id,
        quantity: element.quantity,
        sizes: element.sizes,
      });
    });
    this.cartService
      .addToCartOnBackend({
        productDetails: sendData,
      })
      .subscribe((response: any) => {
        this.myRoute.navigateByUrl(this.previousUrl);
      });
  }
}
