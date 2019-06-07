import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SeaportsTableItem} from './seaports-table/seaports-table-datasource';
import {AlgorithmInput} from './_models/algorithmInput';
import {Coordinates} from './_models/coordinates';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private http: HttpClient) {
  }

  resolve(origin: SeaportsTableItem, destination: SeaportsTableItem, tripDate: Date, cached: boolean) {

    console.log("Requesting route for date:", tripDate.toISOString());
    const input = new AlgorithmInput(new Coordinates(origin.latitude, origin.longitude),
      new Coordinates(destination.latitude, destination.longitude),
      tripDate.toISOString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const reqParams = new HttpParams().set('cachedData', String(cached));
    console.log('request body', input);
    return this.http.post('http://localhost:8080/api/solve', input, {
      params: reqParams
    });
  }
}
