import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TimeService{
  
  getTimeOfDay(): string {
    const hours = new Date().getHours()
    
    if(hours < 12){
      return 'Morning'
    }else if(hours < 17){
      return 'Afternoon'
    }else if(hours < 21){
      return 'Evening'
    }else{
      return 'Night'
    }
  }
}