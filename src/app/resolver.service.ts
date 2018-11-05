import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SeaportsTableItem} from './seaports-table/seaports-table-datasource';
import {AlgorithmInput} from './_models/algorithmInput';
import {Coordinates} from './_models/coordinates';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private http: HttpClient) {
  }

  resolve(origin: SeaportsTableItem, destination: SeaportsTableItem, tripDate) {
    const input = new AlgorithmInput(new Coordinates(origin.latitude, origin.longitude),
      new Coordinates(destination.latitude, destination.longitude),
      tripDate);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('request body', input);
    return this.http.post('http://localhost:8080/api/solve', input, {
      headers: headers
    });
  }
}
