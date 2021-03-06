import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
//import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  // MatDialog must be passed to the constructor as a argument so it is available for use in this component
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

/**
 * Opens the registration form (when the sign up button is clicked)
 * @function openUserRegistrationDialog
 */
openUserRegistrationDialog(): void {
  this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
  width: '300px'
  });
}
  
/**
 * Opens the login form (when the login button is clicked)
 * @function openUserLoginDialog
 */
openUserLoginDialog(): void {
  this.dialog.open(UserLoginFormComponent, {
// Assigning the dialog a width
  width: '300px'
  });
}  

}
