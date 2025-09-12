import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatter {
  // Formats a date string into a user-friendly time format.
  formatTime(date: string): string {
    if (!date) {
      // If no date is provided, return an empty string to avoid errors
      return '';
    }

    const dateTime = new Date(date);

    // Use Intl.DateTimeFormat for consistent and locale-friendly time formatting
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Ensures time is displayed in 12-hour format with AM/PM
    }).format(dateTime);
  }
}
