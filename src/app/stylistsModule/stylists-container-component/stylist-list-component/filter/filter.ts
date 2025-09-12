import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  // Stores the currently selected stylist filter option (default: 'all')
  selectedStylists: string = 'all';

  //Injected service used to broadcast filter changes across the app
  fiterService = inject(FilterService);

  /*
  Called whenever the radio button selection changes.
   Emits the currently selected stylist filter to subscribers.
   */
  onBtnChange() {
    this.fiterService.onRadioBtnChanged(this.selectedStylists);
  }
}
