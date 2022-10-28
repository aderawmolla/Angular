import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { forbidenNameValidator } from './shared/userNameValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  reserved=["Admin","Aderaw"]
  constructor(private fb:FormBuilder){}
  registrationForm=this.fb.group({
    userName:["",[Validators.required,Validators.minLength(3),forbidenNameValidator]],
    password:["quarit"],
    confirmPassword:["quarit"],
    address:this.fb.group({
      city:["Addiss"],
      state:["Ethiopia"]
    })
  })
  
  
loadApiData(){
  this.registrationForm.setValue({userName:"Aderaw",password:"quarit",confirmPassword:"quarit",address:{city:"Bahirdar",state:"Ethiopia"}})
}
}
