# MyReads Project

This is the final assessment project submitted for [Udacity's React Fundamentals course](https://www.udacity.com/course/react-nanodegree--nd019). The project was developed on [starter template provided by Udacity](https://github.com/udacity/reactnd-project-myreads-starter). The goal of this project was to acheive these results:
* Match the criteria provided in the project specification of this course
* Using ESLint standard code styling
* Creating new JS files for each component and use import/require statements to include them where they are needed
* Commenting on code where required

Of course, anyone can play around with this project but if trying to get React Nanodegree, please complete the project before looking into this code.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Running the Project

To run this project right away:

* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## Troubleshooting

All required dependencies are already specified. Make sure you have `npm` and `create-react-app` packages installed on your machine. If the problem still persists, try following these guidelines:

* Install other dependencies with `npm install prop-types react-router-dom @material-ui/core`

## What's Included
```bash
├── README.md - # This file
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms to use with this app
├── package.json # npm package manager file (it's unlikely that one will need to modify this)
├── public
│   ├── favicon.ico # React App Icon (Default icon)
│   └── index.html # HTML Template *DO NOT MODIFY*
└── src
    ├── App.css # Styles used in the app
    ├── App.js # This is the root of app responsible for rendering right component
    ├── App.test.js # Used for testing (Provided with Create React App. Testing is encouraged, but not required)
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend (Instructions for the methods are provided in the section below)
    ├── BookItem.js # An individual display of book in a list item
    ├── BooksGrid.js # Books grid view responsible for displaying books played in shelf or recieved in search results
    ├── BookShelf.js # General book shelf component that recevies books and shelf information in props
    ├── CircularIndeterminate.js # Inderminate circular progress bar modified after copying from https://material-ui.com/demos/progress/#circular-indeterminate
    ├── Constants.js # File containing constant keywords used throughout the app to avoid typos and other mistakes
    ├── ControlMenu.js # General control menu class that receives options and value in prop (Used for moving books across sheleves here)
    ├── MyReads.js # My reads books dashboard that displays all available shelves and is responsible for rendering them
    ├── SearchBook.js # Search book component responsible for rendering search UI and communicating with App.js to update state
    ├── icons # Helpful images for this app
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles
    └── index.js # Used for DOM rendering only
```

## Backend Server

For simplification, an already developed backend server has been used which is communicated via [`BooksAPI.js`](src/BooksAPI.js) which contains the methods required to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Contributing

This repository only contains the project submitted by me for [Udacity's React Fundamentals course](https://www.udacity.com/course/react-nanodegree--nd019). Therefore, no contributions are required.