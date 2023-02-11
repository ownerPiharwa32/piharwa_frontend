import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../Pages/common.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  profileData: any;
  constructor(public commonService: CommonService, public router: Router) { }

  ngOnInit(): void {
    this.getProfileDetails();
  }


  getProfileDetails() {
    this.commonService.profileApi().subscribe((data) => this.getProfileDetailsApi(data));
  }
  
  getProfileDetailsApi(data:any){
    if (data.status === true) {
      this.profileData = data.data
      //console.log(this.profileData,"=====================profileData");
    }

  }


}
