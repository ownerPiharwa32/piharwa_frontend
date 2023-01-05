import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

constructor(public  categoryService: CategoryService, ) {}
 public getCategoryData:any
 categoryDataList:any
 nodes = [];
 options = { 
  animateExpand: true,
};

 @Input() productlistId: any;
  ngOnInit() {
    console.log(this.productlistId+'add');
    this.getCategoryList(this.productlistId);
  }
  getCategoryList(productlistId:any) {
    this.categoryService.categoryListApi(productlistId).subscribe((data) => this.getCategoryDataList(data));
  }
  getCategoryDataList(data:any){
    console.log(data)
    if(data.status === true){
      this.categoryDataList= data.data;
      this.nodes = this.categoryDataList;
    }
  }
  onEvent(event:any){
     console.log(event)
  }

  

}
