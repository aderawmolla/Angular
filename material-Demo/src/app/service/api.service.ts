import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 url:string='http://localhost:3000/productList/'
  constructor( private http:HttpClient) { }
  postProduct(data){
    return this.http.post(this.url,data)
    
  }
  getProduct(){
    return this.http.get(this.url)

  }
  putProduct(data,id){
    return this.http.put(this.url+id,data)
  }
  deleteProduct(id){
    return this.http.delete(this.url+id)
  }

}
