import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm=new FormGroup({
    username:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
   })
  constructor(private auth:AuthService) { }
  registerUser(value:any){
  this.auth.registerService(value).then((res)=>{
      
    }).catch((error)=>{
      
    })
   
  }
  get username(){
    return this.userForm.get('username')
  }
  get email(){
    return this.userForm.get('email')
   }
   get password(){
    return this.userForm.get('password')
   }

  ngOnInit(): void {
  }
 
}
