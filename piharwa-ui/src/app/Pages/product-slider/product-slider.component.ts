import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
    constructor(public _commonService :CommonService, public router: Router,) { }
    imageObject=[];
    ngOnInit(): void {
        this.getProductCategories();
    }
    getProductCategories() {
        this._commonService.homePageCategoriesApi().subscribe((data) => this.getProductdetialsApi(data));
      }

      getProductdetialsApi(data:any){
        //console.log(data)
        let productData= data.data;
       let newJson = productData.map((rec:any) => {
            return {
              'title': rec.name,
              'image': rec.categoryImage ,
              'thumbImage': rec.categoryImage,
              'rootid': rec.rootCategory,
              'id': rec._id,
               }
            })
            //console.log(newJson)
            this.imageObject=newJson;
      }


    imgClick(event:any){
        //console.log(event)
        this.imageObject.forEach((arrayItem, index, fullArray)=> {
            if(index === event){
                //console.log(arrayItem['id'])
                let rootId=arrayItem['rootid'];
                let id=arrayItem['id'];
                this.router.navigate(['/productlist/' +rootId+'/'+id]);
            }
        });
      
    }
}
