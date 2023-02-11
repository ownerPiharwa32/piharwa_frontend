import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogListService } from './blog-list.service';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogList: any;
  constructor(public blogListService: BlogListService,public router: Router) { }

  ngOnInit(): void {
    this.getAllBlogsList();
  }

  getAllBlogsList() {
    this.blogListService.blogListApi().subscribe((data) => this.getblogList(data));
  }
  
  getblogList(data:any){
    if (data.status === true) {
      this.blogList = data.data
      //console.log(this.blogList,"==========blogList");
    }
  
  }


}
