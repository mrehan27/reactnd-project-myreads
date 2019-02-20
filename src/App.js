import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as Constants from './Constants'
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import MyReads from './MyReads';

class BooksApp extends Component {

  state = {
    shelves: [
      {
        value: Constants.SHELF_TYPE_CURRENTLY_READING,
        title: 'Currently Reading',
      },
      {
        value: Constants.SHELF_TYPE_WANT_TO_READ,
        title: 'Want to Read',
      }, {
        value: Constants.SHELF_TYPE_READ,
        title: 'Read',
      },
    ],
    availableBooks: {},
    booksInShelf: {},
  };

  /**
   * Assigns the requested shelf to the given book
   */
  onShelfChanged = (book, shelf) => {
    // Check if the book was previously available or not
    let isBookAvailable = this.state.availableBooks[book.id] !== undefined;
    // Update book shelf locally and on API
    book.shelf = shelf;
    BooksAPI.update(book, shelf)
      .then(shelves => {
        // If it was not available earlier, fetch the specific book to get full details
        if (!isBookAvailable) {
          // NOTE: This call assumes the shelf has not changed in the meantime
          BooksAPI.get(book.id)
            .then(book => this.addBookToMap(book));
        }
        // Update shelves from API response to keep the UI updated
        let booksInShelf = {};
        this.state.shelves.forEach((shelf) => (booksInShelf[shelf.value] = shelves[shelf.value]));
        // Updating state
        this.setState(() => ({
          booksInShelf: booksInShelf,
        }));
      });
    // If it was not available earlier, add locally to available books
    let availableBooks = this.state.availableBooks;
    if (!isBookAvailable) {
      availableBooks[book.id] = book;
    }
    // Re-assign shelves and update state to reflect changes
    this.assignBooksToShelf(Object.values(this.state.availableBooks))
  }

  /**
   * Adds book to available books map and update state
   */
  addBookToMap(book) {
    let availableBooks = this.state.availableBooks;
    availableBooks[book.id] = book;
    this.setState(() => ({
      availableBooks: availableBooks,
    }));
  }

  /**
   * Creates available books map from books array, assign shelf to them and update state
   */
  assignBooksToShelf(books) {
    let mapOfBooks = {};
    let booksInShelf = {};
    // Initialize empty shelves
    this.state.shelves.forEach((shelf) => booksInShelf[shelf.value] = []);
    // Map books array to map and assign shelves where possible
    books.forEach((book) => {
      mapOfBooks[book.id] = book;
      if (book.shelf && booksInShelf[book.shelf]) {
        booksInShelf[book.shelf] = booksInShelf[book.shelf].concat(book.id);
      }
    });
    // Updating state
    this.setState(() => ({
      availableBooks: mapOfBooks,
      booksInShelf: booksInShelf,
    }));
  }

  componentDidMount() {
    // Fetch all books
    BooksAPI.getAll()
      .then(books => {
        this.assignBooksToShelf(books);
      });
  }

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <MyReads
              shelves={this.state.shelves}
              availableBooks={this.state.availableBooks}
              booksInShelf={this.state.booksInShelf}
              onShelfChanged={this.onShelfChanged} />
          )} />
        <Route
          path='/search'
          render={() => (
            <SearchBook
              availableBooks={this.state.availableBooks}
              onShelfChanged={this.onShelfChanged} />
          )} />
      </div>
    )
  }
}

export default BooksApp;
