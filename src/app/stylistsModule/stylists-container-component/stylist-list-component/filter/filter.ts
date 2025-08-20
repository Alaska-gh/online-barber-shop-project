import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  selectedStylists: string = 'all';

  fiterService = inject(FilterService)

 onBtnChange(){
   this.fiterService.onRadioBtnChanged(this.selectedStylists) // passing the value of the selected radio button 
 }
}
