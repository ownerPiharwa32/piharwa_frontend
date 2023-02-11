import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlogListService } from '../blog-list/blog-list.service';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogDetails: any;
  constructor(private route: ActivatedRoute, public blogDetailsService :BlogListService, public myRoute :Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.getBlogDetails(id);
  }

  getBlogDetails(id:any) {
    this.blogDetailsService.blogDetialsApi(id).subscribe((data) => this.getBlogdetailsApi(data));
  }


  getBlogdetailsApi(data:any){
    if(data.status === true){
      this.blogDetails = data.data
      //console.log(this.blogDetails,"details Blog=====================");
    }
  }

}
