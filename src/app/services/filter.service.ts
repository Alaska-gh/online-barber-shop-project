import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  /*
    Emits the value of the selected filter button whenever it changes.
   Components can subscribe to this to react to filter selections.
   */
  selectedBtnEvent = new Subject<string>();

  /*
   Called whenever a radio button (or filter button) is changed.
    Emits the selected value to all subscribers.
   */
  onRadioBtnChanged(value: string) {
    this.selectedBtnEvent.next(value);
  }
}
