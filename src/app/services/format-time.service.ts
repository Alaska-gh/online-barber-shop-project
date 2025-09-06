import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatter {
  formatTime(date: string, time: string): string {
    if (!date || !time) {
      return '';
    }

    const dateTime = new Date(`${date}T${time}`);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(dateTime);
  }
}
