import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getToken = (): Observable<any> => {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let httpOptions = {
      headers: headers
    };
    return this.http.get<Object[]>(`${environment.apiUrl}/3/authentication/token/new?api_key=${environment.apiKey}`, httpOptions)
  }


  login = (username: string, password: string, request_token) : Observable<any>  => {
    return this.http.post<any>(`${environment.apiUrl}/3/authentication/token/validate_with_login?api_key=${environment.apiKey}`, { username, password,request_token })
      .pipe(map(user => {
      
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);



        return user;
      }));
  }

  
}
