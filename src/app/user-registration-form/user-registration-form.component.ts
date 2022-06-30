import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/*decorator to tell Angular that the class right below is a component. 
The decorator contains instructions for wiring up the class with its stylesheet and template file */
@Component({
  //selector property defines the custom HTML element, into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

//decorator that defines the component’s input:
@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

//method is called once the component has received all its inputs from the calling component:
ngOnInit(): void {
}

/**
 * Sends the values of the form inputs to the back end to register user
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here!
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result);
     this.snackBar.open("You are registered.", 'OK', {
      duration: 5000,
      verticalPosition: 'top'
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  }
