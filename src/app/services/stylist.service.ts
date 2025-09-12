import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes this service available throughout the application
})
export class StylistService {
  // Inject HttpClient for making HTTP requests
  private http = inject(HttpClient);

  // Firebase Realtime Database base URL
  private dbUrl =
    'https://online-barber-shop-e6bfb-default-rtdb.asia-southeast1.firebasedatabase.app';

  // Fetches all users with the role "stylist" from the database.
  fetchAllStylist() {
    // Firebase query parameters: order by 'role' and filter for 'stylist'
    const params = new HttpParams()
      .set('orderBy', JSON.stringify('role'))
      .set('equalTo', JSON.stringify('stylist'));

    return this.http
      .get<{ [key: string]: User }>(`${this.dbUrl}/users.json`, { params })
      .pipe(
        map((user) => {
          const stylist = [];

          // Transform the returned object into an array and include the key as 'id'
          for (let key in user) {
            if (user.hasOwnProperty(key)) {
              stylist.push({ ...user[key], id: key });
            }
          }
          return stylist;
        })
      );
  }
}
