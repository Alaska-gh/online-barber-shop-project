import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/AuthResponse';
import { User } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class UserAuthService {
  // Tracks whether a user is logged in.

  logInState = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));

  // Holds the current authenticated user. Loaded from localStorage if available.

  currentUser = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user'))
  );

  // Dependencies
  http = inject(HttpClient);

  // Firebase Authentication & Realtime Database URLs
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  key = 'AIzaSyA026gRjcoRmgngtRpl_QlKjgoThhYxL-c';
  signupEndPoint = 'signUp';
  signInEndPoint = 'signInWithPassword';
  dbUrl =
    'https://online-barber-shop-e6bfb-default-rtdb.asia-southeast1.firebasedatabase.app';

  /*
    Registers a new user by first creating credentials in Firebase Authentication,
    then saving user profile data in Firebase Realtime Database.
   */
  registerUser(newUser: User) {
    // Payload for Firebase Auth
    const data = {
      email: newUser.email,
      password: newUser.password,
      returnSecureToken: true,
    };

    // Exclude password from the data stored in database
    const { password, ...userData } = newUser;

    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}:${this.signupEndPoint}?key=${this.key}`,
        data
      )
      .pipe(
        // Once credentials are created, store user profile data in the database
        switchMap((userCred) => {
          return this.http.put(`${this.dbUrl}/users/${userCred.localId}.json`, {
            uid: userCred.localId,
            ...userData,
            createdAt: new Date().toISOString(),
          });
        }),
        catchError(this.handleError)
      );
  }

  /* Logs in a user by verifying credentials with Firebase Authentication,
   then fetching the corresponding user profile from the database.
  */
  loginUser(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}:${this.signInEndPoint}?key=${this.key}`,
        data
      )
      .pipe(
        // Once authenticated, fetch user data from the database
        switchMap((userCred) => {
          return this.http
            .get<User>(`${this.dbUrl}/users/${userCred.localId}.json`)
            .pipe(
              map((user) => {
                // Persist user session in localStorage
                localStorage.setItem('user', JSON.stringify(user));

                // Notify subscribers that login state and current user changed
                this.logInState.next(true);
                this.currentUser.next(user);
                return user;
              })
            );
        }),
        catchError(this.handleError)
      );
  }

  // Logs out the current user by clearing local storage and notifying subscribers.

  logoutUser() {
    this.logInState.next(false);
    localStorage.removeItem('user');
  }

  //   Handles Firebase API errors and maps them to human-readable messages.

  handleError(err) {
    let errormessage = 'Unexpected error occurred.';

    if (!err.error || !err.error.error) {
      return throwError(() => errormessage);
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errormessage = 'Email Already Exist.';
        break;
      case 'EMAIL_NOT_FOUND':
        errormessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errormessage = 'Invalid Password. Please check and try again';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errormessage = 'Invalid Email / Password';
        break;
    }

    return throwError(() => errormessage);
  }
}
