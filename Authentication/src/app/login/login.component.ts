import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email="";
  password="";
 userForm!:FormGroup;
  constructor(private auth:AuthService,private router:Router,private fb:FormBuilder) { }
  login(value:any){
    this.auth.loginService(value).then((res)=>{
    this.userForm.reset()
    this.router.navigate(['home'])
    
    }).catch((error)=>{
     
    })
   
  
  }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }
 
}
