import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environment';
import { LoggingInterceptor } from './interceptors/loogingInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // ✅ scrolls to top
        anchorScrolling: 'enabled', // ✅ supports #anchors
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
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      easeTime: 0,
      enableHtml: true,
      disableTimeOut: false,
      extendedTimeOut: 0,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
};
