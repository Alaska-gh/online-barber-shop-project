import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StylesService } from '../../services/styles.service';

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
serviceService = inject(StylesService)

ngOnInit(): void {
  this.listOfServices = this.serviceService.getServices()
}

searchServices(){
this.searchedKeyWord = this.searchInputEl.nativeElement.value
console.log(this.searchedKeyWord);

}
}
