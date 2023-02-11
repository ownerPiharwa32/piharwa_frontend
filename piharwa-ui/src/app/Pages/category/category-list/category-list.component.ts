import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CategoryService } from '../category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit,OnChanges {


  @Input() productlistId: any;
  @Input() categoryId: string | undefined;
  @Output() selectedCategory = new EventEmitter<any>();

  @ViewChild('tree') tree: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { 
  }
  categoryListArr: any = [];

  categoryList: any = [];
  options = {
    animateExpand: true,
  };

  ngOnInit() {
    // this.getCategoryList(this.productlistId);
  }
  ngOnChanges(changes: SimpleChanges): void{
    this.route.params.subscribe((params: any) => {
      this.categoryId = params['categoryId'];
      //console.log(this.categoryId)
      this.setActiveNode();
    });
     this.getCategoryList(this.productlistId);
  }
  getCategoryList(productlistId:any) {
    this.categoryService.categoryListApi(productlistId)
      .subscribe((data: any) => {
        if (data.status === true) {
          this.categoryList = data.data;
          let cate =data.data
          this.setActiveNode();
          if(this.categoryId  === undefined){
            this.categoryListArr= this.categoryList;
          }
          else{
            this.callNewCate(cate)
          }
        }
      });
  }
  callNewCate(categoryList:any){
    this.categoryListArr=[];
    for (let index = 0; index <categoryList.length; index++) {
      const element = this.categoryList[index];
      if(element.id === this.categoryId ){
        this.categoryListArr=element.children;
      }
    }
    console.log( this.categoryListArr);
  }

  setActiveNode(){
    if (this.categoryId) {
      setTimeout(() => {
        const someNode = this.tree.treeModel.getNodeById(this.categoryId);
        // someNode.setActiveAndVisible();
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
