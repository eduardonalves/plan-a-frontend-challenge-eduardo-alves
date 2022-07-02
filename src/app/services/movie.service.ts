import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) {
    
  }
  getLatestMovie = (): Observable<Movie> => {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let httpOptions = {
      headers: headers
    };
    return this.http.get<Movie>(`${environment.apiUrl}/3/movie/latest?api_key=${environment.apiKey}&language=en-US`, httpOptions)
  }
}
