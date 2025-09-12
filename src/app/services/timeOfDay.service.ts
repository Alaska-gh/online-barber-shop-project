import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  /*
    Determines the time of day (Morning, Afternoon, Evening, or Night)
    based on the current system time.
  */
  getTimeOfDay(): string {
    // Get the current hour (0 - 23)
    const hours = new Date().getHours();

    // Return the appropriate time of day based on hour ranges
    if (hours < 12) {
      return 'Morning';
    } else if (hours < 17) {
      return 'Afternoon';
    } else if (hours < 21) {
      return 'Evening';
    } else {
      return 'Night';
    }
  }
}
