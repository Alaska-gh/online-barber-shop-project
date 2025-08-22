import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

// const allStylist: Stylist [] = JSON.parse(localStorage.getItem('stylist')) || []

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  http: HttpClient = inject(HttpClient);

  private url = 'http://localhost:3000' 
  logInState = new BehaviorSubject<boolean>(!!localStorage.getItem('user'))
  currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
  // user: User | null =  || null;
   

 getUsers(){
    return this.http.get<User[]>(`${this.url}/users`) //returing all list of users from the json server
 }


 loginUser(email: string, password: string): Observable<User | null> {
  return this.http.get<User[]>(`${this.url}/users`).pipe(
    map(users => {
      const user = users.find(
        u => u.email === email && u.password === password
      );
      // if we are able login, we want to update the values of the isLoggedIn, LoggedInUser and the logInState properties
      if(user){
        this.logInState.next(true)
        this.currentUser.next(user)
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user || null;
    })
  );
}


  registerUser(user: User){
    // setting a default image for all users who have not uploaded a picture, since for now we haven't added picture upload option
    if(user.role === 'stylist'
       && user.serviceType.toLowerCase() === 'barber salon service'
       && user.image === undefined){
       user.image = 'images/last-1.jpeg';

    }else if(user.role === 'stylist' 
      && user.serviceType.toLowerCase() === 'beauty salon service' 
      && user.image === undefined){
      user.image = 'images/staff-1.jpeg';
    }
    else if(user.role === 'stylist' 
      && user.serviceType.toLowerCase() === 'unisex salon service'
      && user.image === undefined){
      user.image = 'images/unisex.png'
    }else{
      user.image = 'images/user-avatar.png'
    }
   
    return this.http.post(`${this.url}/users`, user) // sending the user details to the json server
  }


   logoutStylist(){
   
     this.logInState.next(false)
    localStorage.removeItem('user')
   
  }

}






