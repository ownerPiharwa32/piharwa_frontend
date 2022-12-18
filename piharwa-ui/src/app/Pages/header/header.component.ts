import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { CartService } from '../products-page/product-details-page/cart-service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: any;

  constructor(public dialog: MatDialog,public cartService :CartService) {}

  openLoginWindow() {
      const dialogRef = this.dialog.open(LoginPageComponent, {
        width: '700px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    
  }

  ngOnInit(): void {
    this.cartData = this.cartService.getItemData()
    console.log(JSON.stringify(this.cartData));
  }
}
