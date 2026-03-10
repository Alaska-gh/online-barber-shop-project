import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/AuthResponse';
import { User } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  logInState = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  redirectUrl: string | null = null;
  
  currentUser = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user')),
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
    const data = {
      email: newUser.email,
      password: newUser.password,
      returnSecureToken: true,
    };
    const { password, ...userData } = newUser;

    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}:${this.signupEndPoint}?key=${this.key}`,
        data,
      )
      .pipe(
        switchMap((userCred) => {
          return this.http.put(`${this.dbUrl}/users/${userCred.localId}.json`, {
            uid: userCred.localId,
            ...userData,
            createdAt: new Date().toISOString(),
          });
        }),
        catchError(this.handleError),
      );
  }

  loginUser(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}:${this.signInEndPoint}?key=${this.key}`,
        data,
      )
      .pipe(
        switchMap((userCred) => {
          return this.http
            .get<User>(`${this.dbUrl}/users/${userCred.localId}.json`)
            .pipe(
              map((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.logInState.next(true);
                this.currentUser.next(user);
                return user;
              }),
            );
        }),
        catchError(this.handleError),
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
