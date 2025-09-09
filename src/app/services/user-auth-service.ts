import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { child, get, ref, set } from 'firebase/database';

// const allStylist: Stylist [] = JSON.parse(localStorage.getItem('stylist')) || []

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  // private http: HttpClient = inject(HttpClient);
  private auth = inject(Auth);
  private db = inject(Database);

  logInState = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  currentUser = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user'))
  );

  // getUsers() {
  //   return this.http.get<User[]>(`${this.url}/users`);
  // }

  // loginUser(email: string, password: string): Observable<User | null> {
  //   return this.http.get<User[]>(`${this.url}/users`).pipe(
  //     map((users) => {
  //       const user = users.find(
  //         (u) => u.email === email && u.password === password
  //       );

  //       if (user) {
  //         this.logInState.next(true);
  //         this.currentUser.next(user);
  //         localStorage.setItem('user', JSON.stringify(user));
  //       }
  //       return user || null;
  //     })
  //   );
  // }

  async registerUser(newUser: User) {
    try {
      // Create user in Firebase Authentication
      const userCredentials = await createUserWithEmailAndPassword(
        this.auth,
        newUser.email,
        newUser.password
      );

      const user = userCredentials.user;

      // Save only safe extra data in Realtime Database
      const { password, ...userData } = newUser; // remove password before saving

      await set(ref(this.db, `users/${user.uid}`), {
        uid: user.uid,
        ...userData, // this will include name, phone, email, etc.
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCred = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // fecth details of the user
      const databaseref = ref(this.db);
      const snapshot = await get(
        child(databaseref, `users/${userCred.user.uid}`)
      );

      if (snapshot.exists()) {
        const user = snapshot.val();
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.next(user);
        this.logInState.next(true);
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  logoutUser() {
    this.auth.signOut();
    this.logInState.next(false);
    localStorage.removeItem('user');
  }
}
