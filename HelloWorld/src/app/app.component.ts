import { Component, Injectable } from '@angular/core';
import { EmployeeListService } from './employee-list.service';
import{User} from './user'
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
userModel=new User("molla@gmail.com","password",true,"default")
 topics=["Angular","Vue","React"]
 hasError=true;
 constructor(private service:EmployeeListService){}
 validateTopic(value){
  if(value==="default"){
    this.hasError=true
  }else{
    this.hasError=false
  }
 }
onSubmit(){
this.service.enroll(this.userModel) .subscribe(data=>console.log(data),error=>console.log(error))


}
}
