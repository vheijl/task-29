import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Joke } from '../models/joke';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private jokesUrl:string = 'https://icanhazdadjoke.com/';

  private httpOptions:object = {
    headers: new HttpHeaders({ 
      'Accept': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  /** GET: Get joke from the REST API */
  getJoke():Observable<Joke> {
    return this.http.get<Joke>(this.jokesUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Joke>('getJoke'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
