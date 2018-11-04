import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SeaportsTableItem} from './seaports-table/seaports-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class SeaportService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SeaportsTableItem[]> {
    return this.http.get<SeaportsTableItem[]>('http://localhost:8080/seaport');
  }
}
