import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface User{
  email: string;
  last_login:string;
  username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}) 
export class HomeComponent implements OnInit {
usersData=[];
displayedColumns=['email','last_login','username'];
dataSource: MatTableDataSource<User>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
//  here is something
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
  constructor(private auth:AuthService) {

   }

  ngOnInit(): void {
  
   this.getAllUsers()
    
  }
  getAllUsers(){
    this.auth.getAll()
    this.usersData=this.auth.users;
    this.dataSource=new MatTableDataSource(this.usersData);
    console.log(this.usersData)
   }
   
  logout(){
    this.auth.signOutService().then(()=>{
    
    })
  }

}


