import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {
  url="http://localhost:3000/enroll"
  constructor(private http:HttpClient){}
  enroll(user:User){
    return this.http.post<any>(this.url,user)
  }
}
