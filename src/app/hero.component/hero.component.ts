import { Component } from '@angular/core';

@Component({
  selector: 'hero-section',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  sendMessage(){
    alert('Hi Thanks For Being here!!! We Are Currently working on this feature!')
  }
}
