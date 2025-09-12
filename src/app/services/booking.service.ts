import { Appointment } from './../interfaces/appointment.interface';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Services } from '../interfaces/services.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private stylist: User = null; // Stores the currently selected stylist
  private style: Services = null; // Stores the selected service style
  private formData: any = null; // Temporarily stores form data before submission
  private http: HttpClient = inject(HttpClient);
  private baseUrl =
    'https://online-barber-shop-e6bfb-default-rtdb.asia-southeast1.firebasedatabase.app/appointments';

  // Sets the selected stylist in memory
  setStylist(stylist: User) {
    this.stylist = stylist;
  }

  // Gets the currently selected stylist
  getStylist() {
    return this.stylist;
  }

  //  Sets the selected service style
  setStyle(style: Services) {
    this.style = style;
  }

  // Gets the selected service style
  getStyle() {
    return this.style;
  }

  // Stores form data temporarily before booking
  setFormData(data: any) {
    this.formData = data;
  }

  // Retrieves the stored form data
  getFormData() {
    return this.formData;
  }

  /*
    Fetch all appointments for a specific customer (by email)
    Returns an array of appointments belonging to the customer.
   */
  getAppointmentsForCustomer(email: string) {
    const params = new HttpParams()
      .set('orderBy', JSON.stringify('email'))
      .set('equalTo', JSON.stringify(email));
    return this.http
      .get<{ [key: string]: Appointment }>(`${this.baseUrl}.json`, { params })
      .pipe(
        map((data) => {
          const appts = [];
          // Transform Firebase object response into an array with "id" property
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              appts.push({ ...data[key], id: key });
            }
          }
          return appts;
        }),
        catchError(this.handleError)
      );
  }

  /*
    Fetch all appointments for a stylist on a specific date
   Used to check availability when booking.
   */
  getAppointmentsForStylist(stylist: string, date: string) {
    const params = new HttpParams()
      .set('orderBy', JSON.stringify('stylist'))
      .set('equalTo', JSON.stringify(stylist));
    return this.http
      .get<{ [key: string]: Appointment }>(`${this.baseUrl}.json`, { params })
      .pipe(
        map((data) => {
          const appts = [];
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              appts.push({ ...data[key], id: key });
            }
          }
          // Filter appointments to match the given date
          return appts.filter((appt) => {
            const aptDate = formatDate(appt.dateTime, 'yyyy-MM-dd', 'en-US');
            const newDate = formatDate(date, 'yyyy-MM-dd', 'en-Us');
            return aptDate === newDate;
          });
        }),
        catchError(this.handleError)
      );
  }

  // Updates the status of an appointment (confirmed or rejected)
  updateAppointmentStatus(id: string, status: 'confirmed' | 'rejected') {
    return this.http.patch<Appointment>(`${this.baseUrl}/${id}.json`, {
      status,
    });
  }

  /*
    Fetches all appointments for a stylist (without filtering by date)
    Useful for showing full appointment history.
   */
  getAllAppointmentsForStylist(stylist: string) {
    const params = new HttpParams()
      .set('orderBy', JSON.stringify('stylist'))
      .set('equalTo', JSON.stringify(stylist));
    return this.http
      .get<{ [key: string]: Appointment }>(`${this.baseUrl}.json`, { params })
      .pipe(
        map((response) => {
          let appts = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              appts.push({ ...response[key], id: key });
            }
          }
          return appts;
        }),
        catchError(this.handleError)
      );
  }

  /*
   Creates a new appointment after checking for time conflicts
   Prevents overlapping appointments for the same stylist.
   */
  createAppointment(
    newAppt: Appointment
  ): Observable<{ success: boolean; message: string }> {
    const newStart = new Date(newAppt.dateTime);
    const newEnd = new Date(newStart.getTime() + newAppt.duration * 60000);

    return this.getAppointmentsForStylist(
      newAppt.stylist,
      newAppt.dateTime
    ).pipe(
      map((appointment) => {
        // Check if there is any time overlap with existing appointments
        const conflict = appointment.find((appt) => {
          const apptStart = new Date(appt.dateTime);
          const apptEnd = new Date(apptStart.getTime() + appt.duration * 60000);
          return timesOverlap(newStart, newEnd, apptStart, apptEnd);
        });

        if (conflict) {
          return {
            success: false,
            message: 'This stylist is already booked at that time.',
          };
        }
        return { success: true, message: 'ok' };
      }),

      // If no conflict, proceed to create a new appointment
      switchMap((result) => {
        if (!result.success) {
          throw new Error(result.message);
        }
        return this.http
          .post<Appointment>(`${this.baseUrl}.json`, newAppt)
          .pipe(
            map(() => ({
              success: true,
              message: 'Appointment booked successfully!',
            }))
          );
      }),
      catchError(this.handleError)
    );
  }

  // Handles HTTP errors and returns user-friendly messages.
  handleError(err) {
    let errormessage = 'Unexpected error occurred.';
    switch (err.status) {
      case 0:
        errormessage = 'Network error. Please check your connection.';
        break;
      case 404:
        errormessage = 'Data not found.';
        break;
      case 500:
        errormessage = 'Server error. Please try again later.';
        break;
    }
    return throwError(() => errormessage);
  }

  // Checks if an appointment has already ended based on current time.
  apptHasEnded(appt: Appointment) {
    const start = new Date(appt.dateTime);
    const end = new Date(start.getTime() + appt.duration * 60000);
    return end < new Date();
  }
}

// Utility function to check if two time ranges overlap.
function timesOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
  return start1 < end2 && start2 < end1;
}
