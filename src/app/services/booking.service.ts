import { inject, Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Services } from "../interfaces/services.interface";
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../interfaces/appointment.interface";

@Injectable({
  providedIn: 'root'
})
export class BookingService{
  private stylist: User = null;
  private style: Services = null;
  private formData: any = null

  private http: HttpClient = inject(HttpClient);
  private url = 'http://localhost:3000'

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

  setFormData(data: any){
    this.formData = data
  }

  getFormData(){
    return this.formData
  }
  createAppointment(appointment: Appointment){
    return this.http.post(`${this.url}/appointment`, appointment)
  }
}