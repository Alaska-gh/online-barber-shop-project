import { Component, inject } from '@angular/core';
import { Stylist } from '../../../interfaces/interface';
import { StylistAuthService } from '../../../services/stylist-auth-service';
import { TimeService } from '../../../services/timeOfDay.service';

@Component({
  selector: 'stylist-dashboard',
  imports: [],
  templateUrl: './stylist-dashboard-component.html',
  styleUrl: './stylist-dashboard-component.css'
})
export class StylistDashboardComponent {
  currentStylist: Stylist;
  greetingTime: string

  authService = inject(StylistAuthService)
  timeService = inject(TimeService)



  ngOnInit(): void {    
    this.currentStylist = this.authService.loggedInUser // getting the logged in stylist

    this.updateTimeOfDay()
    setInterval(()=>{
      this.updateTimeOfDay() //updating the time every 1 minute
    }, 60000)
}


  updateTimeOfDay(){
  this.greetingTime = this.timeService.getTimeOfDay()
  }
}

