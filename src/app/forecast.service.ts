import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  forecastMetaData = {
    forecastStartDateTime: {
      month: 'MAY',
      year: 2016,
      dayOfMonth: 1,
      dayOfWeek: 'SUNDAY',
      dayOfYear: 122,
      hour: 0,
      minute: 0,
      nano: 0,
      second: 0,
      monthValue: 5,
      chronology: {
        id: 'ISO',
        calendarType: 'iso8601'
      }
    },
    forecastDuration: 49,
    latDataCount: 3,
    lonDataCount: 4,
    leftBottomLatCoordinate: 48.802824,
    latStep: 0.5378444945891919,
    leftBottomLonCoordinate: 13.236774,
    lonStep: 0.5378444945891919
  };


  constructor(private http: HttpClient) {
  }

  getMockedMetaData(): Observable<Object> {
    return of(this.forecastMetaData);
  }

  getMetaData(): Observable<Object> {
    return this.http.get('http://localhost:8080/api/forecast/meta');
  }

}
