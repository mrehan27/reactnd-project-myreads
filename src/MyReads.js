import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

class MyReads extends Component {

  static propTypes = {
    availableBooks: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    booksInShelf: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
  };

  render() {
    const { availableBooks, shelves, booksInShelf, onShelfChanged } = this.props;
    // Since this component is receiving books array and books IDs map in props, 
    // we need to sepeartely store books array for respective shelfs
    let booksToShelfMap = {};
    shelves.forEach((shelf) => {
      if (booksInShelf[shelf.value]) {
        // Set books only when response received from server so next component may know when to show loader
        let books = [];
        // Sort the books to keep them consistent in UI
        booksInShelf[shelf.value].sort().forEach((bookID) => books.push(availableBooks[bookID]));
        booksToShelfMap[shelf.value] = books;
      }
    });
    return (
      <div className="list-books">
        <PageHeader title='MyReads' />
        <div className="list-books-content">
          {shelves.map((shelf) =>
            <BookShelf
              key={shelf.value}
              shelf={shelf}
              books={booksToShelfMap[shelf.value]}
              onShelfChanged={onShelfChanged} />
          )}
        </div>
        <SearchButton description="Add a book" />
      </div>
    );
  }
}

function PageHeader(props) {
  return (
    <div className="list-books-title">
      <h1>{props.title}</h1>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

function SearchButton(props) {
  return (
    <div className="open-search">
      <Link to='/search'>{props.description}</Link>
    </div>
  );
}

SearchButton.propTypes = {
  description: PropTypes.string.isRequired,
};

export default MyReads;
