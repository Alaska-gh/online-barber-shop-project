import { Router } from '@angular/router';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StylesService } from '../../services/styles.service';
import { Services } from '../../interfaces/services.interface';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'styles-and-services',
  imports: [],
  templateUrl: './styles-and-services-component.html',
  styleUrl: './styles-and-services-component.css'
})
export class StylesAndServicesComponent implements OnInit{
listOfServices: Services[] = []
searchedKeyWord: string = '';
selectedStyle: Services;

@ViewChild('searchInput') searchInputEl: ElementRef;

serviceService = inject(StylesService);
bookingService = inject(BookingService);
router: Router = inject(Router)

ngOnInit(): void {
  this.listOfServices = this.serviceService.getServices()
}

searchServices(){
this.searchedKeyWord = this.searchInputEl.nativeElement.value
console.log(this.searchedKeyWord);

}

selectStyle(style: Services){
  this.bookingService.setStyle(style);
  this.router.navigate(['/booking'])
}
}
