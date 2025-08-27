import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StylesAndServicesService } from '../../services/stylesAndServices.service';

@Component({
  selector: 'styles-and-services',
  imports: [],
  templateUrl: './styles-and-services-component.html',
  styleUrl: './styles-and-services-component.css'
})
export class StylesAndServicesComponent implements OnInit{
listOfServices = []
searchedKeyWord: string = '';

@ViewChild('searchInput') searchInputEl: ElementRef
serviceService = inject(StylesAndServicesService)

ngOnInit(): void {
  this.listOfServices = this.serviceService.services
}

searchServices(){
this.searchedKeyWord = this.searchInputEl.nativeElement.value
console.log(this.searchedKeyWord);

}
}
