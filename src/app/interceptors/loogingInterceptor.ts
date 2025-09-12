import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  /**
   * Intercepts all outgoing HTTP requests in the application.
   *
   * @param req - The outgoing HttpRequest object containing request details
   * @param next - The HttpHandler that forwards the request to the next interceptor or backend
   * @returns Observable<HttpEvent<any>> - The observable stream of the HTTP event
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Log the full request URL (including query params) to the console
    console.log('HTTP call:', req.urlWithParams);

    // Pass the request along the chain to continue normal HTTP flow
    return next.handle(req);
  }
}
