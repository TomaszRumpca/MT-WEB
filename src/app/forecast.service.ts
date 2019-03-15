import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) {
  }

  getMetaData(cachedData: boolean, date: Date): Observable<Object> {
    console.log('requesting forecast metadata...');

    const reqParams = new HttpParams().set('cachedData', String(cachedData)).set('year', String(date.getFullYear()));
    return this.http.get('http://localhost:8080/forecast/meta', { params : reqParams});
  }

  getAvailableDates(cachedData: boolean): Observable<Object> {
    console.log('requesting dates of available forecasts...');

    const headers = new HttpHeaders().set('Cache-Control', 'max-age=86400');
    const reqParams = new HttpParams().set('cachedData', String(cachedData));
    return this.http.get('http://localhost:8080/forecast/dates', { params : reqParams, headers: headers});
  }
}
