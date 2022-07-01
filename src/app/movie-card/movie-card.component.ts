import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { GenreCardComponent } from './../genre-card/genre-card.component';
import { DirectorCardComponent } from './../director-card/director-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favClicked: Boolean = false;
  favs: string[] = [];
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavs();
  }
  /**
  * fetches all movies from API and sets movies state 
  * @function getMovies
  * @returns array of movie objects
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
  * opens modal to view synopsis info
  * @function getSynopsis
  * @param movieDescription synopsis text
  */
  getSynopsis(movieDescription: string): void {
    this.dialog.open(SynopsisCardComponent, {
      width: "500px", 
      data: {movieDescription}
    });
  }
  /**
  * opens modal to view director info
  * @function getDirector
  * @param directorName director name
  * @param directorBio director biography
  * @param directorBirth director birthday
  */
  getDirector(directorName: string, directorBio: string, directorBirth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { directorName, directorBio, directorBirth},
      width: '500px',
    });
  }

  /**
  * opens modal to view director info
  * @function getGenre
  */
   getGenre(genreName: string, genreDescription: string,): void {
    this.dialog.open(GenreCardComponent, {
      width: '500px',
    });
  }
    
  /**
  * fetches list of favorites and sets favs state
  * @function getFavs
  * @returns array of ids of favorited movies
  */
  getFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
    this.favs = resp.FavMovies
    return this.favs
       
    })
    console.log(this.favs);
  }

  /**
   * evaluates if a movie is on the favorites list
   * @function isFav
   * @param id 
   * @returns boolean 
   */
  isFav(id: string): Boolean {
    return this.favs.includes(id) ? true : false
  }

  /**
   * adds or removes movies from favorites in database and app
   * @function toggleFav
   * @param id 
   * @returns updated list of favorites
   */
  toggleFav(id: string): void {
    if (this.isFav(id)) {
      console.log("trying to remove...")
      this.fetchApiData.removeFavMovie(id).subscribe((resp: any) => {
        this.snackbar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
        return this.favs.splice(this.favs.indexOf(id), 1)
      })
    } else if (!this.isFav(id)) {
      console.log("trying to add...")

      this.fetchApiData.addFavMovie(id).subscribe((resp: any) => {
        console.log(id);
        this.snackbar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
        return this.favs.push(id);
      })
    }
  } 
  
}