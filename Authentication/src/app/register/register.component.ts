import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
  registerUser(value:any){
    this.auth.registerService(value).then((res)=>{
      this.router.navigate(['login'])
    }).catch((error)=>{
      this.router.navigate(['register'])
    })
   
  }

  ngOnInit(): void {
  }
 
}
