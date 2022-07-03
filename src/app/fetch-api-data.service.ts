import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from "./types/User";


///Declares the API url that will provide data for the client app
const apiUrl = 'https://tech-and-popcorn.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

/* -- USER CALLS -- */  

 /**
  * Makes API call to the user registration endpoint
  * @function userRegistration
  * @param userDetails 
  * @returns new user JSON object or error message
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

   /**
    * Makes API call for user login endpoint
    * @function userLogin
    * @param userUsername 
    * @param userPassword 
    * @returns user JSON object or error message
    */
   public userLogin(userUsername: string, userPassword: string): Observable<any> {
   
    return this.http.post(`${apiUrl}login?Username=${userUsername}&Password=${userPassword}`, {}).pipe(
    catchError(this.handleError)
    );
  }
/**
 * Makes API call to fetch data of the logged in user
 * @function getUser
 * @returns user JSON object or error message
 */

 getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/${user}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }),}).pipe(catchError(this.handleError)
  );
}
/**
 * Make API call to add movie to favorites list
 * @function addFavMovie
 * @param id 
 * @returns updated array of the favorite movie's array or error message
 */
 addFavMovie(id:string): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/${username}/movies/${id}`, null,{headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    
    catchError(this.handleError)
  );
}

/**
 * Removes movie form favorite list
 * @function removeFavMovie
 * @param id 
 * @returns updated array of the favorite movie's array or error message
 */

removeFavMovie(id:string): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
   
    catchError(this.handleError)
  );
}

/**
 * Makes API call to update user profile data
 * @function updateUser
 * @param userDetails 
 * @returns updated user JSON object or error message
(username: string, userData: object) 
*/
updateUser(userDetails: User): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.put(`${apiUrl}users/${username}`, userDetails,  {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(catchError(this.handleError)
  );
  
}

/**
 * Make API call to delete user from database
 * @function deleteUser
 * @returns success message or error message
 */
deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(`${apiUrl}users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }),
  responseType: "text"}).pipe(
    catchError(this.handleError)
  );
}

/* -- MOVIE CALLS -- */

  /**
   * Makes API call to fetch all movies in database
   * @function getAllMovies
   * @returns array of movie JSON objects or error message
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      
      catchError(this.handleError)
    );
  }

 /**
  * Makes API call to fetch a specific movie by its id
  * @function getOneMovie
  * @returns movie JSON object or error message
  */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:id', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        
      catchError(this.handleError)
    );
  } 

/**
  * Makes API call to fetch the director of a movie by their name
  * @function getDirector
  * @param directorName
  * @returns director JSON object or error message
  */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}directors/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      
      catchError(this.handleError)
    );
  }

/**
 * Make API call to fetch genres of a movie
 * @function getGenre
 * @returns array of genre ids or error message
 */
getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/:id/genre', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    
    catchError(this.handleError)
  );
}

/* -- GENRE CALLS -- */
  
  /**
  * Makes API call to fetch all genres in database
  * @function getAllGenres
  * @returns array of genre JSON objets or error message
  */
  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        catchError(this.handleError)
      );
  }
 

/**
 * Logs error message.
 * @function handleError
 * @param error 
 * @returns error message in console
 */
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