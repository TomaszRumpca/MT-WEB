import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SeaportsTableItem} from './seaports-table/seaports-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class SeaportService {

  seaportOptions: SeaportsTableItem[] = [
    {id: 1, name: 'Port of Sassnitz', waterway: 'balticsea', country: 'DE', city: 'Sassnitz', latitude: 54.4966666, longitude: 14.2125},
    {
      id: 1,
      name: 'Port of Ueckermunde',
      waterway: 'balticsea',
      country: 'DE',
      city: 'Ueckermunde',
      latitude: 54.7377777,
      longitude: 14.511111
    },
    {
      id: 1,
      name: 'Port Handlowy Swinoujscie',
      waterway: 'balticsea',
      country: 'PL',
      city: 'Swinoujscie',
      latitude: 53.905,
      longitude: 14.269722
    },
    {id: 1, name: 'Port of Police', waterway: 'balticsea', country: 'PL', city: 'Police', latitude: 53.5702777, longitude: 14.5752777},
    {id: 1, name: 'Port of Szczecin', waterway: 'balticsea', country: 'PL', city: 'Szczecin', latitude: 53.430555, longitude: 14.5872222},
    {
      id: 1,
      name: 'Port of Kołobrzeg',
      waterway: 'balticsea',
      country: 'PL',
      city: 'Kołobrzeg',
      latitude: 54.1861111,
      longitude: 15.5533333
    },
    {id: 1, name: 'Port of Darlowo', waterway: 'balticsea', country: 'PL', city: 'Darlowo', latitude: 54.4377777, longitude: 16.383055},
    {id: 1, name: 'Port Ustka', waterway: 'balticsea', country: 'PL', city: 'Port Ustka', latitude: 54.5944444, longitude: 16.8538888},
    {
      id: 1,
      name: 'Port of Wladyslawowo',
      waterway: 'balticsea',
      country: 'PL',
      city: 'Władysławowo',
      latitude: 54.7961111,
      longitude: 18.4186111
    },
    {id: 1, name: 'Port of Hel', waterway: 'balticsea', country: 'PL', city: 'Hel', latitude: 54.6069444, longitude: 18.7927777},
    {id: 1, name: 'Port of Gdynia', waterway: 'balticsea', country: 'PL', city: 'Gdynia', latitude: 54.5333333, longitude: 18.5413888},
    {id: 1, name: 'Port of Gdansk', waterway: 'balticsea', country: 'PL', city: 'Gdansk', latitude: 54.393333, longitude: 18.6700000},
    {id: 1, name: 'Port Polnocny', waterway: 'balticsea', country: 'PL', city: 'Gdansk', latitude: 54.39444444, longitude: 18.7208333},
    {
      id: 1,
      name: 'Port of Elblag',
      waterway: 'balticsea',
      country: 'PL',
      city: 'Port of Elblag',
      latitude: 54.1736111,
      longitude: 19.388333
    },
    {
      id: 1,
      name: 'Port of Kaliningrad',
      waterway: 'balticsea',
      country: 'PL',
      city: 'Kaliningrad',
      latitude: 54.7000000,
      longitude: 20.4586111
    }
  ];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SeaportsTableItem[]> {
    return this.http.get<SeaportsTableItem[]>('http://localhost:8080/seaport');
  }

}
