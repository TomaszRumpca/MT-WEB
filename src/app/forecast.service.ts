import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

}
