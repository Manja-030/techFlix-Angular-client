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

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getSynopsis(movieDescription: string): void {
    this.dialog.open(SynopsisCardComponent, {
      width: "500px", 
      data: {movieDescription}
     });
    }
    getDirector(directorName: string, directorBio: string, directorBirth: string): void {
      this.dialog.open(DirectorCardComponent, {
        data: { directorName, directorBio, directorBirth},
        width: '500px',
       });
      }
    
  /**
   * fetches list of favorites
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
   * evaluates if a movie is inside the favorites list
   * @param id 
   * @returns boolean
   */
  isFav(id: string): Boolean {
    return this.favs.includes(id) ? true : false
  }

  /**
   * addes or removies movies from favorites in database and app
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