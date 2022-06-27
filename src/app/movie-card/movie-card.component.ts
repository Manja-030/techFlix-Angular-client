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
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackbar: MatSnackBar) { }

ngOnInit(): void {
  this.getMovies();
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
    
     
  
}