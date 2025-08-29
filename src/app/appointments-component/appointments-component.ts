import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StylesService } from '../services/styles.service';
import { BookingService } from '../services/booking.service';
import { User } from '../interfaces/user.interface';
import { Services } from '../interfaces/services.interface';

@Component({
  selector: 'app-appointments-component',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './appointments-component.html',
  styleUrl: './appointments-component.css'
})
export class AppointmentsComponent implements OnInit{
selectedstylist: User;
selectedStyle: Services;

  formBuilder: FormBuilder = inject(FormBuilder)

  servicesservice = inject(StylesService)
  bookingservice = inject(BookingService)


  appointmentForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNum: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    stylist: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: [''],
    agreement: ['', Validators.required]
  }
  )


  get fname(){
    return this.appointmentForm.controls['fullName']
  }

  get phoneNum(){
    return this.appointmentForm.controls['phoneNum']
  }

  get email(){
    return this.appointmentForm.controls['email']
  }

  get stylist(){
    return this.appointmentForm.controls['stylist']
  }

  get service(){
    return this.appointmentForm.controls['service']
  }

  get date(){
    return this.appointmentForm.controls['date']
  }

  get time(){
    return this.appointmentForm.controls['time']
  }

  get agreement(){
    return this.appointmentForm.controls['agreement']
  }

ngOnInit(): void {
  this.selectedStyle = this.bookingservice.getStyle()
  this.selectedstylist = this.bookingservice.getStylist()  

  if(this.selectedstylist){
    this.appointmentForm.patchValue({
      stylist: this.selectedstylist.bussinessName
    })
  }

  if(this.selectedStyle){
    this.appointmentForm.patchValue({
      service: this.selectedStyle.name
    })
  }
}

  submitForm(){

  }

}
