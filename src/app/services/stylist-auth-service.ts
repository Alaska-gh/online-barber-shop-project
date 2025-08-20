import { inject, Injectable } from '@angular/core';
import { Stylist } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';

// const allStylist: Stylist [] = JSON.parse(localStorage.getItem('stylist')) || []

@Injectable({
  providedIn: 'root'
})
export class StylistAuthService {
  
  isLoggedIn: boolean = false;

  http: HttpClient = inject(HttpClient);

  private url = 'http://localhost:3000' 

  logInState = new Subject<boolean>()

  loggedInUser: Stylist | null = null;
   
 getStylist(){
    return this.http.get<Stylist[]>(`${this.url}/users`) //returing all list of users from the json server
 }


 login(email: string, password: string): Observable<Stylist | null> {
  return this.http.get<Stylist[]>(`${this.url}/users`).pipe(
    map(users => {
      const user = users.find(
        u => u.email === email && u.password === password
      );
      // if we are able login, we want to update the values of the isLoggedIn, LoggedInUser and the logInState properties
      if(user){
        this.loggedInUser = user
        this.isLoggedIn = true
        this.logInState.next(this.isLoggedIn)
      }
      return user || null;
    })
  );
}


  createStylist(stylist: Stylist){
    // setting a default image for all users who have not uploaded a picture, since for now we haven't added picture upload option
    if(stylist.serviceType.toLowerCase() === 'barber salon service' && stylist.image === undefined){
      stylist.image = 'images/last-1.jpeg';

    }else if(stylist.serviceType.toLowerCase() === 'beauty salon service' && stylist.image === undefined){
      stylist.image = 'images/staff-1.jpeg';
    }
    else if(stylist.serviceType.toLowerCase() === 'unisex salon service' && stylist.image === undefined){
      stylist.image = 'images/unisex.png'
    }
   
    return this.http.post(`${this.url}/users`, stylist) // sending the user details to the json server
  }


   logout(){
    this.isLoggedIn = false
    this.logInState.next(this.isLoggedIn)
  }

  isAuthorised(){
   return this.isLoggedIn
  }
}






