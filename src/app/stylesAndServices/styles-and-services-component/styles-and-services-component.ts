import { Component, inject, OnInit } from '@angular/core';
import { StylesAndServicesService } from '../../services/stylesAndServices.service';

@Component({
  selector: 'styles-and-services',
  imports: [],
  templateUrl: './styles-and-services-component.html',
  styleUrl: './styles-and-services-component.css'
})
export class StylesAndServicesComponent implements OnInit{
 listOfServices = []

  serviceService = inject(StylesAndServicesService)

ngOnInit(): void {
  this.listOfServices = this.serviceService.services
}
}
