import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {
  movieGenreIds: string [] = [];
  filteredGenreObjects: any[] = [];
 
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      movieGenre: any,
      genreDescription: string,}
  ) { }

  //this.movieGenreIds = this.data.movieGenre;

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data.movieGenre);
    this.filterGenreObjects();
  }

    /** 
     * turns list of genre id in array of genre objects
     * @function filterGenreObjects
     * @returns array of genre
     */
    filterGenreObjects(): void{
      this.movieGenreIds = this.data.movieGenre;
      this.fetchApiData.getAllGenres().subscribe((resp: any)=>{
        const genres = resp;
        genres.forEach((genre: any) => {
          this.movieGenreIds.includes(genre._id) ? this.filteredGenreObjects.push(genre) : null;
        })
        return this.filteredGenreObjects;
      })
      console.log(this.filteredGenreObjects);
     
    }
   
  
/* GENRE-MODAL - This is what I want to do:
  1. Get genre of my movie -> returns array of ids
  But to display the genre I need the corresponding object that holds all the data!
  2. Get all genres -> returns array of genre objects with these keys
    - id
    - Name
    - Description
  3. Create an empty list: filteredGenreObjects
  4. for each genre object
    - check: is id included in id-array of movie?  
    - if yes: push the genre object to the new array filteredGenreObjects
  5. Tell my genre-card component what genres to display*/

}
