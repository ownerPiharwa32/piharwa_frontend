import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussel sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
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


  @Input() productlistId: any;
  @Output() selectedCategory = new EventEmitter<any>();

  constructor(public categoryService: CategoryService, ) { }

  categoryList: any = [];
  options = {
    animateExpand: true,
  };


  ngOnInit() {
    this.getCategoryList(this.productlistId);
  }

  getCategoryList(productlistId: any) {
    this.categoryService.categoryListApi(productlistId)
    .subscribe((data: any) => {
      console.log(data)
      if (data.status === true) {
        this.categoryList = data.data;
      }
    });
  }
  

  onEvent(event: any) {
    console.log(event);
    console.log(event.node.data);

    let titleArr = [event.node.data.name];

    let parent = event.node.parent;

    while(parent) {
      if (parent.parent) {
        const data = parent.data;
        titleArr.push(data.name);
      }
      parent = parent.parent;
    }

    console.log("title ", titleArr);

    const title = titleArr.reverse().join(' / ');

    const selectedCategory = event.node.data;
    selectedCategory.title = title;

    this.selectedCategory.emit(selectedCategory);
  }

}
