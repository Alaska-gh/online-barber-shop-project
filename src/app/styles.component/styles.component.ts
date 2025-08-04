import { Component } from '@angular/core';
import { StylesService } from './styles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'styles-component',
  imports: [CommonModule],
  templateUrl: './styles.component.html',
  styleUrl: './styles.component.css'
})
export class StylesComponent {
  styles
  constructor(){
  this.styles = new StylesService()
  } 
}
