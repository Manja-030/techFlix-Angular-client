import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// For navigating through the application:
import { Router } from '@angular/router';

/*decorator to tell Angular that the class right below is a component. 
The decorator contains instructions for wiring up the class with its stylesheet and template file */
@Component({
  //selector property defines the custom HTML element, into which this component will render
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: ''};

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }
    

ngOnInit(): void {
}

// function for sending the form inputs to the backend to log in user
loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {
  // Logic for a successful user registration goes here! 
   
     console.log(result);
          // Add token and username to local Storage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("You are logged in.", 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
      this.router.navigate(['movies']);
    
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  

}
