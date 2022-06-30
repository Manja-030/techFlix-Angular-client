# techFlix Application

--- screen shot goes here ---

This is the client side application for this [API](https://github.com/Manja-030/movie-app). It showcases several movies. The user can create, update and delete their account, and get information about each movie and add movies to a list of favorites.

## Key Features

### Welcome View

User can login or register

### Movie View

Displays all movies. For each movie the user can by clicking the corresponding button get a synopsis, info about the director and movie genre. The user can also add the movie to their list of favorites or remove it.

### Profile View

User can edit their profile and displays the favorite movies.

Returns a list of ALL movies to the user (each listed item with an image, title, and description).
User can select a movie for more details.

## Tools

- [Angular] (https://angular.io/)
- [Angular Material](https://material.angular.io/) UI Component Library
- [TypeDoc](https://typedoc.org/) for creating documentation

If you are interested - there is [another version](https://github.com/Manja-030/techFlix-client) of the techFlix frontend that I built with React and Redux.

## Getting Started

### Install Angular

Check if Angular is already installed on device.
```bash
ng --version
```

If not, install Angular
```bash
npm install -g @angular/cli
```

### Create a new Angular Project

Navigate to folder and create project
```bash
ng new my-project-name
```

Navigate to project folder to run project
```bash
ng serve --open
```
The application will open in the browser and automatically reload if you change any of the source files.

### Set up App to load Data from the Movie API
Go to file app.module.ts
  ```bash
  import { HttpClientModule } from '@angular/common/http';
  ```
Add HttpClientModule to the imports of @NgModule
Go to app folder
```bash
  ng generate service fetch-api-data
  ```
Add import statements to fetch-api-data.service.ts file
  ```bash
  import { catchError } from 'rxjs/internal/operators';
  import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map } from 'rxjs/operators';
  ```
Implement servic logic to make API calls. For endpoints refer to [this documentation].

### Add Angular Material to the Project

### Create Components

### Add Routing

### Add TypeDoc Documentation

### Deploy your App
