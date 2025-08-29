import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Services } from "../interfaces/services.interface";

@Injectable({
  providedIn: 'root'
})
export class BookingService{
  private stylist: User = null;
  private style: Services = null;

  setStylist(stylist: User){
    this.stylist = stylist
  }

  getStylist(){
    return this.stylist
  }


  setStyle(style: Services){
    this.style = style
  }

  getStyle(){
    return this.style
  }
}