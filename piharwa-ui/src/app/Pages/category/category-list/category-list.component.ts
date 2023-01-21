import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { CategoryService } from '../category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';

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
  @Input() categoryId: string | undefined;
  @Output() selectedCategory = new EventEmitter<any>();

  @ViewChild('tree') tree: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { 
    this.route.params.subscribe((params: any) => {
      this.categoryId = params['categoryId'];
      this.setActiveNode();
    });
  }

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
        if (data.status === true) {
          this.categoryList = data.data;
          this.setActiveNode();
        }
      });
  }

  setActiveNode(){
    if (this.categoryId) {
      setTimeout(() => {
        const someNode = this.tree.treeModel.getNodeById(this.categoryId);
        someNode.setActiveAndVisible();
      }, 100);
    }
  }

  onEvent(event: any) {
    let titleArr = [event.node.data.name];
    let parent = event.node.parent;

    while (parent) {
      if (parent.parent) {
        const data = parent.data;
        titleArr.push(data.name);
      }
      parent = parent.parent;
    }

    const title = titleArr.reverse().join(' / ');
    const selectedCategory = event.node.data;
    selectedCategory.title = title;

    this.selectedCategory.emit(selectedCategory);
  }

}
