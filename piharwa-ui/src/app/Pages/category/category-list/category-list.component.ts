import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

constructor(public  categoryService: CategoryService) {}
 public getCategoryData:any
 categoryDataList:any
  ngOnInit() {
    this.getCategoryList();
  }
  getCategoryList() {
    this.categoryService.categoryListApi().subscribe((data) => this.getCategoryDataList(data));
  }
  getCategoryDataList(data:any){
    console.log(data)
    if(data.status === true){
      this.categoryDataList= data.data;
    }
  }

}
