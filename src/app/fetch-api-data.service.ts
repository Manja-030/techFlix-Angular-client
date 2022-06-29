import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "./types/User";


///Declaring the api url that will provide data for the client app
const apiUrl = 'https://tech-and-popcorn.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Make the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

   // Make api call for the user login endpoint
   public userLogin(userUsername: string, userPassword: string): Observable<any> {
   
    return this.http.post(`${apiUrl}login?Username=${userUsername}&Password=${userPassword}`, {}).pipe(
    catchError(this.handleError)
    );
  }
  // Request all movies in database
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
    // Request all genres in database
    getAllGenres(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'genres', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
        map(this.extractResponseData),
        
        catchError(this.handleError)
      );

    }

   // Request specific movie by id
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:id', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Request data of specific director by name
getDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/director/:Name', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Request genres of a movie
getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/:id/genre', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Request data of logged in user
getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/${user}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }),}).pipe(catchError(this.handleError)
  );
}



// Add a movie to favourite Movies
addFavMovie(id:string): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/${username}/movies/${id}`, null,{headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


// Remove movie form favorite movies

removeFavMovie(id:string): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}/movies/movies/${id}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Update user info

updateUser(userDetails: User): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${user}`,userDetails, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(catchError(this.handleError)
  );
}


// delete user

deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }),
  responseType: "text"}).pipe(
    catchError(this.handleError)
  );
}


// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}