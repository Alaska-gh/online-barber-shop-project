import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { CustomPreloadingStrategy } from './services/preload-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
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
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easeTime: 0,
      enableHtml: true,
      disableTimeOut: false,
      extendedTimeOut: 0,
    }),
  ],
};
