import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 userForm=new FormGroup({
  email:new FormControl("",Validators.required),
  password:new FormControl("",Validators.required)
 })
 get email(){
  return this.userForm.get('email')
 }
 get password(){
  return this.userForm.get('password')
 }
  constructor(private auth:AuthService,private fb:FormBuilder) { }
  login(value:any){
    this.auth.loginService(value).then((res)=>{
    }).catch((error)=>{
     
    })
   
  
  }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }
  googleLogin(){
    this.auth.googleService().then(()=>{
      
    }).catch(()=>{
     
    })

    
  }
 
}
