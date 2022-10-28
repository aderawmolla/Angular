
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { ApiService } from './service/api.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  displayedColumns: string[] = ['productName', 'category','date','freshness','price', 'comment','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog,private api:ApiService) {}
  openDialog() {
    const dialogRef = this.dialog.open(AddComponent,{width:"70vw",height:"auto"});
    dialogRef.afterClosed().subscribe(val => {
     if(val=="save"){
      this.getAllProducts()
     }
    });
  }
  ngOnInit(): void {
      this.getAllProducts()
  }
 getAllProducts(){
  this.api.getProduct().subscribe({
    next:(res)=>{
     this.dataSource=new MatTableDataSource(<any>res);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort;
 
    },
    error:(error)=>{
      console.log(error)
    }
  })
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
editProduct(row){
this.dialog.open(AddComponent,{data:row,}).afterClosed().subscribe(val => {
  if(val=="edit"){
   this.getAllProducts()
  }
 });
}
deleteProduct(id){
  this.api.deleteProduct(id).subscribe({
    next:()=>{
      alert("delete successful")
      this.getAllProducts()
    },
    error:()=>{
      alert("unable to delet")
    }
  })
}
}
