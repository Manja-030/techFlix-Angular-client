import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
   
  }

  /**
   * Remove user from database and route to welcome page.
   * @function deleteProfile
   */
  deleteProfile(): void {
    this.fetchApiData.deleteUser().subscribe((resp) => {
      this.snackBar.open(resp, 'OK', {
        duration: 5000
     });
     localStorage.clear();
     this.router.navigate(['welcome']);      
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
    })
  }
}
