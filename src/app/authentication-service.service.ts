import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean;
  private user: any;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {

    const basicAuth = btoa(username + ':' + password);
    localStorage.setItem('basicAuth', basicAuth);
    const headers = new HttpHeaders({
      authorization: 'Basic ' + basicAuth
    });

    return this.http.get('http://localhost:8080/user', {headers: headers});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


}
