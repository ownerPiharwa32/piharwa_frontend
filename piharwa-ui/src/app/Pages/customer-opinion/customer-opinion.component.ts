import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialService } from './customer-opinion.service';
@Component({
  selector: 'app-customer-opinion',
  templateUrl: './customer-opinion.component.html',
  styleUrls: ['./customer-opinion.component.scss']
})
export class CustomerOpinionComponent {
  testimonialData: any;
  showTestimonialData: boolean = false;
  selectedTestimonial: any;

  constructor(
    private testimonialService: TestimonialService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getTestimonialList();
  }

  getTestimonialList() {
    this.testimonialService.testimonialListApi().subscribe((data : any) => {
      if (data.status === true) {
        this.testimonialData = data.data
        this.showTestimonialData = true;
        this.selectedTestimonial = data.data[0];
      }
    });
  }

  gotoTestimonial(id:any): void {
    this.router.navigate(['#testimonial-',id]);
  }

}
