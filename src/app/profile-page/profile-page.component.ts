import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {User} from "../types/User";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  hide= true;
  favIds: string[] = [];
  favList: any[] = [];

  @Input() userInfo = { 
   
    Username: "", 
    Email: "", 
    //Password: '', 
    Birthday: ""
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    //public router: Router
  ) {}
 
  ngOnInit(): void {
    this.getUserData();
    this.getFavorites();
    console.log(this.userInfo);
    console.log(this.favIds)
  }

/**
   * formats birthday data so it can be processed by date form
   * @function formatBirthday
   * @param birthday date string
   * @returns formatted date string
   */
  formatBirthday(birthday: string): string {
    this.userInfo.Birthday = new Date(birthday).toISOString().split('T')[0]
    return this.userInfo.Birthday 
  }

 /**
   * fetches user profile data and favs, sets user 
   * @function getUserData
   * @returns user JSON data
   */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.userInfo = {
        
          Username: resp.Username,
          Email: resp.Email,
          //Password: '',
          Birthday: this.formatBirthday(resp.Birthday)
        }
        this.favIds = resp.FavMovies;
        return this.userInfo;
       
        
      });
    }
  

  /**
  * opens modal to delete user account
  * @function openDeleteDialog
  */
       openDeleteDialog(): void {
        console.log(this.userInfo);
        this.dialog.open(DeleteDialogComponent, {
          width: '280px'
        })
      }
  
/**
* turns movie ids from favorite list into array of movie objetcs
* @function getFavorites
* @returns function that pushes movies to favorite list
*/     
 getFavorites(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    const movies = resp;
    movies.forEach((movie: any) => {
      this.favIds.includes(movie._id) ? this.favList.push(movie) : null
  });
  })
  console.log("Favoriten-Array:" + this.favList)
}

/**
   * sends updated user data to API
   * @function saveChanges
   * @returns object of updated user data
   */
 saveChanges(): void {
  console.log(this.userInfo);
  this.fetchApiData.updateUser(this.userInfo).subscribe((resp: User) => {
    this.userInfo = {
      
      Username: resp.Username,
      Email: resp.Email,
      //Password: '',
      Birthday: this.formatBirthday(resp.Birthday)
    };
    console.log("response save changes: " + resp )
    this.snackBar.open("Changes saved", 'OK', {
      duration: 5000
   });
   console.log("response save changes: " + resp )
    return this.userInfo
  })
}





 
}

