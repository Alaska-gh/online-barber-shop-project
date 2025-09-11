import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatter {
  formatTime(date: string): string {
    if (!date) {
      return '';
    }

    const dateTime = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(dateTime);
  }
}
