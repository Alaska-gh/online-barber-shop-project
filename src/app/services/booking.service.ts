import { inject, Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Services } from "../interfaces/services.interface";
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../interfaces/appointment.interface";
import { map, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService{
  private stylist: User = null;
  private style: Services = null;
  private formData: any = null

  private http: HttpClient = inject(HttpClient);
  private url = 'http://localhost:3000/appointment'



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

  getAllAppointmentsForStylist(stylist: string){
    return this.http.get<Appointment[]>(`${this.url}?stylist=${stylist}`)
  }

  getAppointmentsForStylist(stylist: string, date: string){
    return this.http.get<Appointment[]>(`${this.url}?sylist=${stylist}&date=${date}`)
  }

  getAppointmentsByCustomer(email: string){
    return this.http.get<Appointment[]>(`${this.url}?email=${email}`)
  }

  updateAppointmentStatus(id: number, status: 'confirmed' | 'rejected'){
    return this.http.patch<Appointment>(`${this.url}/${id}`,  { status })
  }


  createAppointment(newAppt: Appointment): Observable<{success: boolean, message: string}>{
    const newStart = new Date(`${newAppt.date}T${newAppt.time}`);
    const newEnd = new Date(newStart.getTime() + newAppt.duration * 60000)
      return this.getAppointmentsForStylist(newAppt.stylist, newAppt.date).pipe(
        map( appointment =>{
          const conflict = appointment.find(appt => {
            const apptStart = new Date(`${appt.date}T${appt.time}`)
            const apptEnd = new Date(apptStart.getTime() + appt.duration * 60000)
            return timesOverlap(newStart, newEnd, apptStart, apptEnd)
          } );          
          if(conflict){
            return { success: false, message: 'This stylist is already booked at that time.' }
          }
          return { success: true, message: 'ok' };
        }),
       switchMap(result => {
        if(!result.success){
          throw new Error(result.message);
          
        }

        return this.http.post<Appointment>(this.url, newAppt).pipe(
          map(() => ({ success: true, message: 'Appointment booked successfully!' }))
        );
       })
        
      )


  }
}

function timesOverlap(start1: Date, end1: Date, start2:Date, end2:Date){
  return start1 < end2 && start2 < end1
}