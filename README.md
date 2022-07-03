# techFlix Application

<img width="1393" alt="Bildschirmfoto 2022-07-03 um 04 15 50" src="https://user-images.githubusercontent.com/80778632/177021862-d598a788-089b-44eb-a465-192e16e4a20f.png">

This is the client side application for this [API](https://github.com/Manja-030/movie-app). It showcases several movies. The user can create, update and delete their account, and get information about each movie and add movies to a list of favorites.

## Key Features

User can register, log in, log out, update and delete account.
User can view movie posters of the movies that are in the database.
User can get read synopsis and get information about the director (name, birth year, bio)
User can add movies to a list of favorites and remove movies from that list.
User can view the favorite movies list.

## App components
* Welcome View
  * User registration form (signup)
  * User login form
* Navbar 
* Movie Card View
* Dialogs for Movie Card: 
  * Director
  * Genre
  * Synopsis
* Profile View
  * Edit profile dialog
  * View list of favorite movies

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
1. Set up Angular HttpClient
Go to file app.module.ts
  ```bash
  import { HttpClientModule } from '@angular/common/http';
  ```
Add HttpClientModule to the imports of @NgModule
2. Create Angular Service for Consuming API
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
3. Implement servic logic to make API calls. 
For endpoints refer to [this documentation](https://github.com/Manja-030/movie-app/blob/main/public/documentation.html).

### Add Angular Material to the Project
Install as a project dependency:
```bash
ng add @angular/material
```
Import the modules you want to use for your project to the file app.module.ts
Add modules to imports array to serve to other components.

### Create Components
```bash
ng generate component my-component-name
```
### Add Routing

Import Angular's built-in router:
```bash
import { RouterModule, Routes } from '@angular/router';
```
Add this to app.component.html:
```bash
<router-outlet></router-outlet> 
```

### Add TypeDoc Documentation

Install TypeDoc
```bash
npm install typedoc
```
Make sure that code is commented following best practice.

Run typedoc to create documentation:
```bash
typedoc --entryPointStrategy expand ./src
```

### Deploy to GitHub Pages and build App

Add angular-cli-ghpages by running 
```bash
ng add angular-cli-ghpages.
```
Then run
```bash
 ng deploy --base-href=/<repository-name>/.
```
(replace <repository-name> with the name of your own repository.)
