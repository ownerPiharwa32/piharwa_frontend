import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/api-path/api-config';

@Injectable({
  providedIn: 'root'
})
export class LatestArrivalService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
   latestArrivalListApi () {
    return this.http.get(ApiConstants.apiURL + ApiConstants.latestArrivals);
   }
}
