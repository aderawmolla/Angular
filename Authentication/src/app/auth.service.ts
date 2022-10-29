import { Injectable } from '@angular/core';
import { signInWithPopup,signInWithRedirect,getAuth,GoogleAuthProvider,Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set,get, ref, query,getDatabase,update,limitToLast } from '@angular/fire/database';
import { Router } from '@angular/router';
import { child, onValue } from 'firebase/database';
import { Observable } from 'rxjs';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  title = 'angular-fire';
  users=[];
  constructor( private router:Router,public auth: Auth, public database: Database) { }

  //register service

  registerService(value: any) {

    return createUserWithEmailAndPassword(this.auth,value.email,value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        set(ref(this.database, 'users/' + user.uid), {
          username: value.username,
          email: value.email,
          last_login:"only registered user"
        });

        alert('user reated successfully! ');
        this.router.navigate(['login'])
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }

  loginService(value: any){
   
    //login service
  return signInWithEmailAndPassword(this.auth,value.email, value.password)
      .then((userCredential) => {
        // Signed in 
       
        const user = userCredential.user;

        const date = new Date();
        update(ref(this.database, 'users/' + user.uid), {  
         last_login: date
    
        });
        alert("successflly sign")
        this.router.navigate(['home'])
       //all logics
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        alert(errorMessage)
        
      });
  }

  //logout service
  signOutService(){
   return  signOut(this.auth).then(() => {
     alert("signout successful")
      this.router.navigate(['login'])
      }).catch((error) => {
        // An error happened.
      });
  }


//get all data  
getAll(){
const db = getDatabase();
const starCountRef = ref(db);
get(child(starCountRef,"users/")).then((snapshot)=>{
  
  snapshot.forEach((childSnapshot)=>{
  this.users.push(childSnapshot.val())
  })
  
})
}

//login with google account
googleService(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider).then(()=>{
  this.router.navigate(['home'])
  }).catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    alert(errorMessage)
  })
}
}
