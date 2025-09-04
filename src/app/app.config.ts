import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr'


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // ✅ scrolls to top
        anchorScrolling: 'enabled',           // ✅ supports #anchors
      })
    ),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
 
    ),
      provideToastr({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        easeTime: 0,
        enableHtml: true,
        disableTimeOut: false,
        extendedTimeOut: 0,
}) 
]
};






