import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialService } from './customer-opinion.service';
@Component({
  selector: 'app-customer-opinion',
  templateUrl: './customer-opinion.component.html',
  styleUrls: ['./customer-opinion.component.scss']
})
export class CustomerOpinionComponent {
  testimonailDetails: any;

  constructor(public testimonialService: TestimonialService, public router: Router) { }

  ngOnInit(): void {
    this.getTestimonialList();
  }

  getTestimonialList() {
    this.testimonialService.testimonialListApi().subscribe((data) => this.getProductListApi(data));
  }

  getProductListApi(data: any) {
    if (data.status === true) {
      this.testimonailDetails = data.data
      console.log(this.testimonailDetails,"===============================testimonailData");
    }

  }


  gotoTestimonial(id:any): void {
    this.router.navigate(['#testimonial-',id]);
  }

}
