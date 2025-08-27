import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth-service';
import { TimeService } from '../../../services/timeOfDay.service';
import { CalendarEvent, CalendarModule, CalendarUtils } from 'angular-calendar';
import { User } from '../../../interfaces/user.interface';


@Component({
  selector: 'stylist-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  providers: [
    CalendarUtils
  ],
  templateUrl: './stylist-dashboard-component.html',
  styleUrl: './stylist-dashboard-component.css'
})
export class StylistDashboardComponent {
  currentStylist: User;
  greetingTime: string

  authService = inject(UserAuthService)
  timeService = inject(TimeService)


  viewDate: Date = new Date()
  view: string = 'month'
  events: CalendarEvent[] = [
      {
      start: new Date(),
      title: 'Today\'s Event',
      color: {
         primary: '#1e90ff', 
         secondary: '#D1E8FF' 
        },
    }
  ]

  ngOnInit(): void {    
    this.currentStylist = this.authService.currentUser.value // getting the logged in stylist

    this.updateTimeOfDay()
    setInterval(()=>{
      this.updateTimeOfDay() //updating the time every 1 minute
    }, 60000)
}


  updateTimeOfDay(){
  this.greetingTime = this.timeService.getTimeOfDay()
  }

   handleEvent(action: string, event: any): void {
    // Handle event
  }
}

