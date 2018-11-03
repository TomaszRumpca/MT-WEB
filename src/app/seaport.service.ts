import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './_models/user';
import {Observable} from 'rxjs';
import {SeaportsTableItem} from './seaports-table/seaports-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class SeaportService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SeaportsTableItem[]> {
    const headers = new HttpHeaders({
      authorization:
      'Basic ' + btoa('user' + ':' + '77e50111-ca9e-4d85-8b17-3312870a1daa')
    });

    return this.http.get<SeaportsTableItem[]>('http://localhost:8080/seaport', {headers: headers});
  }


}
