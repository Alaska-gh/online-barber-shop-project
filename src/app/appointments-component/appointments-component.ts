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
import { SignupLoader } from '../utilities/login/signup-loader/signup-loader';

@Component({
  selector: 'app-appointments-component',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    SignupLoader,
  ],
  templateUrl: './appointments-component.html',
  styleUrl: './appointments-component.css',
})
export class AppointmentsComponent implements OnInit {
  // Stores the stylist selected by the user
  selectedstylist: User;

  // Stores the selected service/style
  selectedStyle: Services;

  // Array of booked slots (start and end times) to prevent overlap
  bookedSlots: { start: Date; end: Date }[] = [];

  // Logged-in user information
  loggedInUser: User = null;

  // Current date in YYYY-MM-DD format (used to prevent booking in the past)
  currentTime = new Date().toISOString().split('T')[0];

  // Loading indicator for submit process
  isLoading: boolean;

  // Dependency injection for required services
  formBuilder: FormBuilder = inject(FormBuilder);
  servicesservice = inject(StylesService);
  bookingservice = inject(BookingService);
  authservice = inject(UserAuthService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    // Retrieve selected style and stylist from the booking service
    this.selectedStyle = this.bookingservice.getStyle();
    this.selectedstylist = this.bookingservice.getStylist();

    // Restore previously saved form data (if any)
    const saveddata = this.bookingservice.getFormData();
    if (saveddata) {
      this.appointmentForm.patchValue(saveddata);
    }

    // If stylist was previously selected, pre-fill stylist field
    if (this.selectedstylist) {
      this.appointmentForm.patchValue({
        stylist: this.selectedstylist.bussinessName,
      });
    }

    // If service was previously selected, pre-fill service field
    if (this.selectedStyle) {
      this.appointmentForm.patchValue({
        service: this.selectedStyle.name,
      });
    }

    // Save form data on every change so user progress is not lost
    this.appointmentForm.valueChanges.subscribe((values) => {
      this.bookingservice.setFormData(values);
    });

    // Subscribe to logged-in user observable to keep user data updated
    this.authservice.currentUser.subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  // Define the appointment booking form with validation rules
  appointmentForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNum: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    stylist: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: [''],
    agreement: ['', Validators.required], // checkbox or confirmation must be checked
  });

  // Getter methods for template form control access
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

  /*
    Fetches all booked appointments for the selected stylist on a given date
    and populates `bookedSlots` to prevent overlapping bookings.
   */
  onDateOrStylistChanged() {
    const stylist = this.appointmentForm.value.stylist;
    const date = this.appointmentForm.value.date;

    if (stylist && date) {
      this.bookingservice.getAppointmentsForStylist(stylist, date).subscribe({
        next: (appointments) => {
          this.bookedSlots = appointments.map((appointment) => {
            const start = new Date(appointment.dateTime);
            const end = new Date(
              start.getTime() + appointment.duration * 60000 // add duration in minutes
            );
            return { start, end };
          });
        },
      });
    }
  }

  /*
   Validates the selected time to ensure:
    - It's not in the past
    - It does not overlap with other booked slots
   */
  onTimeChange(event: Event) {
    const now = new Date();
    const time = (event.target as HTMLInputElement).value;
    if (!time) return;

    // Calculate start and end times for the new appointment
    const newStart = new Date(`${this.appointmentForm.value.date}T${time}`);
    const newEnd = new Date(
      newStart.getTime() + this.selectedStyle.duration * 60000
    );

    // Prevent booking in the past
    if (newStart < now) {
      this.appointmentForm.get('time')?.setErrors({ pastTime: true });
    }

    // Check for overlapping bookings
    const conflict = this.bookedSlots.find(
      (slot) => newStart < slot.end && slot.start < newEnd
    );

    if (conflict) {
      this.appointmentForm.get('time')?.setErrors({ conflict: true });
    } else {
      this.appointmentForm.get('time')?.setErrors(null);
    }
  }

  /*
   Submits the appointment form:
   - Validates date/time to avoid past bookings
    - Creates appointment data object
    - Calls BookingService to save the appointment
    - Displays success/error notifications
   */
  async submitForm() {
    this.isLoading = true;
    const formValues = this.appointmentForm.value;

    const start = new Date(`${formValues.date}T${formValues.time}`);

    // Prevent booking in the past
    if (start < new Date()) {
      this.toastr.error(
        "You can't book an appointment in the past",
        'Invalid Time'
      );
      this.isLoading = false;
      return;
    }

    // Build appointment object
    const appointmentData: Appointment = {
      fullName: formValues.fullName,
      phoneNum: formValues.phoneNum,
      email: formValues.email,
      dateTime: start.toISOString(),
      stylist: formValues.stylist,
      service: formValues.service,
      notes: formValues.notes,
      duration: this.selectedStyle.duration,
      price: this.selectedStyle.price,
      status: 'pending', // default status until stylist confirms
    };

    // Call service to create appointment
    this.bookingservice.createAppointment(appointmentData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Appointment Booked Successfully', 'Thank You');
      },
      error: (errMsg) => {
        this.isLoading = false;
        this.toastr.error(errMsg);
      },
    });

    // Reset the form after successful booking
    this.appointmentForm.reset();
  }
}
