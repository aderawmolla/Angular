import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
   productForm !:FormGroup;
   saveoredit="save"
   constructor(@Inject(MAT_DIALOG_DATA) public editable,private formBuilder:FormBuilder,private api:ApiService,private matDialogRef:MatDialogRef<AddComponent>){}
  freshness=["Brand new","Second hand","Refurbished"]
  

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
    })
      if(this.editable){
        this.saveoredit="edit"
        this.productForm.controls['productName'].setValue(this.editable.productName)
        this.productForm.controls['category'].setValue(this.editable.category)
        this.productForm.controls['freshness'].setValue(this.editable.freshness)
        this.productForm.controls['price'].setValue(this.editable.price)
        this.productForm.controls['comment'].setValue(this.editable.comment)
        this.productForm.controls['date'].setValue(this.editable.date)

      }
    }
  addProduct(){
  if(!this.editable){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value).subscribe({
     next:(res)=>{
      alert("product added successfully")
      this.productForm.reset()
      this.matDialogRef.close()

     },
     error:(error)=>{
      alert("some error happen")
     }
    })
  }}else{
    this.updateProduct() 
  }
  }
updateProduct(){
this.api.putProduct(this.productForm,this.editable.id).subscribe({
  next:()=>{
    alert("product updated successfully")
    this.productForm.reset()
    this.matDialogRef.close("update")
  },
  error:(error)=>{
    alert("some error happen while editing")
    console.log(error)
  }
})
}

}


