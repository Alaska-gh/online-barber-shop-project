import { Appointment } from './../interfaces/appointment.interface';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Services } from '../interfaces/services.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private stylist: User = null;
  private style: Services = null;
  private formData: any = null;
  private http: HttpClient = inject(HttpClient);
  private baseUrl =
    'https://online-barber-shop-e6bfb-default-rtdb.asia-southeast1.firebasedatabase.app/appointments';

  setStylist(stylist: User) {
    this.stylist = stylist;
  }

  getStylist() {
    return this.stylist;
  }

  setStyle(style: Services) {
    this.style = style;
  }

  getStyle() {
    return this.style;
  }

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  getAllAppointmentsForStylist(stylist: string) {
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
          return appts;
        }),
        catchError(this.handleError)
      );
  }

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
          return appts.filter((appt) => appt.date === date);
        }),
        catchError(this.handleError)
      );
  }

  getAppointmentsByCustomer(email: string) {
    const params = new HttpParams()
      .set('orderBy', JSON.stringify('email'))
      .set('equalTo', JSON.stringify(email));
    return this.http
      .get<{ [key: string]: Appointment }>(`${this.baseUrl}.json`, { params })
      .pipe(
        map((data) => {
          // Transfom data
          let appts = [];
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

  updateAppointmentStatus(id: string, status: 'confirmed' | 'rejected') {
    return this.http.patch<Appointment>(`${this.baseUrl}/${id}.json`, {
      status,
    });
  }

  // getAllAppointments() {
  //   this.http
  //     .get<{ [key: string]: Appointment }>(`${this.baseUrl}.json`)
  //     .pipe(
  //       map((response) => {
  //         // TRANSFORM DATA
  //         let appts = [];

  //         for (let key in response) {
  //           if (response.hasOwnProperty(key)) {
  //             appts.push({ ...response[key], id: key });
  //           }
  //         }
  //         return appts;
  //       })
  //     )
  //     .subscribe((appts) => {
  //       console.log(appts);
  //     });
  // }

  createAppointment(
    newAppt: Appointment
  ): Observable<{ success: boolean; message: string }> {
    const newStart = new Date(`${newAppt.date}T${newAppt.time}`);
    const newEnd = new Date(newStart.getTime() + newAppt.duration * 60000);
    return this.getAppointmentsForStylist(newAppt.stylist, newAppt.date).pipe(
      map((appointment) => {
        const conflict = appointment.find((appt) => {
          const apptStart = new Date(`${appt.date}T${appt.time}`);
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
            })),
            catchError(this.handleError)
          );
      })
    );
  }

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

  apptHasEnded(appt: Appointment) {
    const start = new Date(`${appt.date}T${appt.time}`);
    const end = new Date(start.getTime() + appt.duration * 60000);
    return end < new Date();
  }
}

function timesOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
  return start1 < end2 && start2 < end1;
}
