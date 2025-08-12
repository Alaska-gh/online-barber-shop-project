import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  selectedStylists: string = 'all';

  @Output() selectedStylistEvent = new EventEmitter<string>();

 onBtnChange(){
  this.selectedStylistEvent.emit(this.selectedStylists)
 }
}
