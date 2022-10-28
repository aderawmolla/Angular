import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set,get, ref, query,getDatabase,update,limitToLast } from '@angular/fire/database';
import { child, onValue } from 'firebase/database';
import { Observable } from 'rxjs';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  title = 'angular-fire';
  users=[];
  constructor(public auth: Auth, public database: Database) { }
  registerService(value: any) {

    return createUserWithEmailAndPassword(this.auth,value.email,value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential)
        console.log(user)

        set(ref(this.database, 'users/' + user.uid), {
          username: value.username,
          email: value.email,
          last_login:"only registered user"
        });

        alert('user created! ');
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
    
  return signInWithEmailAndPassword(this.auth,value.email, value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const date = new Date();
        update(ref(this.database, 'users/' + user.uid), {  
         last_login: date
    
        });
        alert("successflly sign")
       //all logics
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        alert(errorMessage)
      });
  }
  signOutService(){
   return   signOut(this.auth).then(() => {
      
      }).catch((error) => {
        // An error happened.
      });
  }
getAll(){
const db = getDatabase();
const starCountRef = ref(db);
get(child(starCountRef,"users/")).then((snapshot)=>{
  
  snapshot.forEach((childSnapshot)=>{
  this.users.push(childSnapshot.val())
  })
  
})

}
}
