import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from './Pages/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  previousUrl='';
  currentUrl='';
  constructor(private router: Router,public commonService:CommonService) {}
  
  ngOnInit() {
      this.router.events.pipe(
          filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
         this.previousUrl = this.currentUrl;
         this.currentUrl = event.url;
        //  console.log(this.previousUrl)
         //console.log(this.currentUrl)

         this.commonService.setPreviousUrl( this.currentUrl )
      });
  }
}
