import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
  * routes to movies page
  */
  homeClick(): void {
    this.router.navigate(['movies'])
  }

  /**
   * routes to user profile page
   */
  toProfileClick(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs user out and routes to welcome page
   */
  logOut(): void {
    localStorage.clear()
    this.snackbar.open("Successfully logged out.", 'OK', {
      duration: 3000
   });
    this.router.navigate(['welcome'])
  }

 
}