import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    // Only preload if data.preload === true
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
