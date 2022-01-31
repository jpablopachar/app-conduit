import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistanceService } from '../services/persistance.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _persistanceService: PersistanceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._persistanceService.get('accessToken');

    request = request.clone({
      setHeaders: { Authorization: token ? `Token ${token}` : '' },
    });

    return next.handle(request);
  }
}