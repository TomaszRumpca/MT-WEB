import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const basicAuth = localStorage.getItem('basicAuth');
    if (basicAuth !== undefined) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${basicAuth}`
        }
      });
    }
    return next.handle(req);
  }
}
