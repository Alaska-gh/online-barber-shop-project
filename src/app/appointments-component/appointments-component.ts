import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StylesService } from '../services/styles.service';
import { BookingService } from '../services/booking.service';
import { User } from '../interfaces/user.interface';
import { Services } from '../interfaces/services.interface';
import { Appointment } from '../interfaces/appointment.interface';

@Component({
  selector: 'app-appointments-component',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './appointments-component.html',
  styleUrl: './appointments-component.css'
})
export class AppointmentsComponent implements OnInit{
selectedstylist: User;
selectedStyle: Services;
idCounter = 0

  formBuilder: FormBuilder = inject(FormBuilder)

  servicesservice = inject(StylesService)
  bookingservice = inject(BookingService)


  appointmentForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNum: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    stylist: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: [''],
    agreement: ['', Validators.required]
  }
  )
ngOnInit(): void {
  this.selectedStyle = this.bookingservice.getStyle()
  this.selectedstylist = this.bookingservice.getStylist()  
  const saveddata = this.bookingservice.getFormData()


  if(saveddata){
    this.appointmentForm.patchValue(saveddata)
  }

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

  this.appointmentForm.valueChanges.subscribe((values) =>{
    this.bookingservice.setFormData(values)
  })
}

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





  submitForm(){
   const formValues = this.appointmentForm.value;
   const appointmentData: Appointment = {
    id: this.idCounter++,
    fullName: formValues.fullName,
    phoneNum: formValues.phoneNum,
    email: formValues.email,
    date: formValues.date,
    stylist: formValues.stylist,
    service: formValues.service,
    time: formValues.time,
    notes: formValues.notes,
   }

   this.bookingservice.createAppointment(appointmentData).subscribe(
     reponse =>{
      console.log(reponse);
      alert('Appointment Created Successfully')
   },
   error =>{
    console.log(error);
    
   }
   
  )
  }

}
