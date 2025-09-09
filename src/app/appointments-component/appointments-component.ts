import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StylesService } from '../services/styles.service';
import { BookingService } from '../services/booking.service';
import { User } from '../interfaces/user.interface';
import { Services } from '../interfaces/services.interface';
import { Appointment } from '../interfaces/appointment.interface';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { UserAuthService } from '../services/user-auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments-component',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './appointments-component.html',
  styleUrl: './appointments-component.css',
})
export class AppointmentsComponent implements OnInit {
  selectedstylist: User;
  selectedStyle: Services;
  bookedSlots: { start: Date; end: Date }[] = [];
  loggedInUser: User = null;
  currentTime = new Date().toISOString().split('T')[0];

  formBuilder: FormBuilder = inject(FormBuilder);
  servicesservice = inject(StylesService);
  bookingservice = inject(BookingService);
  authservice = inject(UserAuthService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.selectedStyle = this.bookingservice.getStyle();
    this.selectedstylist = this.bookingservice.getStylist();
    const saveddata = this.bookingservice.getFormData();

    if (saveddata) {
      this.appointmentForm.patchValue(saveddata);
    }

    if (this.selectedstylist) {
      this.appointmentForm.patchValue({
        stylist: this.selectedstylist.bussinessName,
      });
    }

    if (this.selectedStyle) {
      this.appointmentForm.patchValue({
        service: this.selectedStyle.name,
      });
    }

    this.appointmentForm.valueChanges.subscribe((values) => {
      this.bookingservice.setFormData(values);
    });

    this.authservice.currentUser.subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  appointmentForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNum: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    stylist: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: [''],
    agreement: ['', Validators.required],
  });

  // getter methods for the formControls
  get fname() {
    return this.appointmentForm.controls['fullName'];
  }

  get phoneNum() {
    return this.appointmentForm.controls['phoneNum'];
  }

  get email() {
    return this.appointmentForm.controls['email'];
  }

  get stylist() {
    return this.appointmentForm.controls['stylist'];
  }

  get service() {
    return this.appointmentForm.controls['service'];
  }

  get date() {
    return this.appointmentForm.controls['date'];
  }

  get time() {
    return this.appointmentForm.controls['time'];
  }

  get agreement() {
    return this.appointmentForm.controls['agreement'];
  }

  // fetch all appointments for a stylist on a particular day
  onDateOrStylistChanged() {
    const stylist = this.appointmentForm.value.stylist;
    const date = this.appointmentForm.value.date;

    if (stylist && date) {
      this.bookingservice.getAppointmentsForStylist(stylist, date).subscribe({
        next: (appointments) => {
          this.bookedSlots = appointments.map((appointment) => {
            const start = new Date(`${appointment.date}T${appointment.time}`);
            const end = new Date(
              start.getTime() + appointment.duration * 60000
            );
            return { start, end };
          });
        },
        error: (err) => {
          // this.toastr.error(err.message);
        },
      });
    }
  }
  // checks to make sure the start of a new appointment is not before the end of the existing one
  onTimeChange(event: Event) {
    const now = new Date();
    const time = (event.target as HTMLInputElement).value;
    if (!time) return;

    const newStart = new Date(`${this.appointmentForm.value.date}T${time}`);
    const newEnd = new Date(
      newStart.getTime() + this.selectedStyle.duration * 60000
    );

    if (newStart < now) {
      this.appointmentForm.get('time')?.setErrors({ pastTime: true });
    }

    const conflict = this.bookedSlots.find(
      (slot) => newStart < slot.end && slot.start < newEnd
    );

    if (conflict) {
      this.appointmentForm.get('time')?.setErrors({ conflict: true });
    } else {
      this.appointmentForm.get('time')?.setErrors(null);
    }
  }

  submitForm() {
    const formValues = this.appointmentForm.value;

    const start = new Date(`${formValues.date}T${formValues.time}`);

    if (start < new Date()) {
      this.toastr.error(
        "You can't book an appointment in the past",
        'Invalid Time'
      );
      return;
    }
    const appointmentData: Appointment = {
      fullName: formValues.fullName,
      phoneNum: formValues.phoneNum,
      email: formValues.email,
      date: formValues.date,
      stylist: formValues.stylist,
      service: formValues.service,
      time: formValues.time,
      notes: formValues.notes,
      duration: this.selectedStyle.duration,
      price: this.selectedStyle.price,
      status: 'pending',
    };

    this.bookingservice.createAppointment(appointmentData).subscribe({
      next: () =>
        this.toastr.success('Appointment Booked Successfully', 'Thank You'),
      error: () =>
        this.toastr.error(
          `Couldn't Book Your Appointment At This Time`,
          'Try Again'
        ),
    });
    this.appointmentForm.reset();
  }
}
