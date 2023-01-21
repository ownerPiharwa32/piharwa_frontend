import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
    
  }
  testimonialListApi () {
    return this.http.get(ApiConstants.apiURL + ApiConstants.testimonialList);
   }
}