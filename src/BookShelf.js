import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import * as Constants from './Constants'
import BooksGrid from './BooksGrid';
import CircularIndeterminate from './CircularIndeterminate';

function BookShelf(props) {
    const { shelf, books, onShelfChanged } = props;
    return (
        <div className='bookshelf'>
            <Header title={shelf.title} />
            {!books && (
                <div
                    className='bookshelf-books'
                    style={{ marginTop: 100, marginBottom: 100 }}>
                    <CircularIndeterminate color={Constants.COLOR_PRIMARY} />
                </div>
            )}
            {books && books.length === 0 && (
                <div
                    className='bookshelf-books'
                    style={{ marginTop: 100, marginBottom: 100 }}>
                    <h3>You don't have any book in this shelf</h3>
                </div>
            )}
            {books && (
                <div className='bookshelf-books'>
                    <BooksGrid books={books} onShelfChanged={onShelfChanged} />
                </div>
            )}
        </div>
    );
}

BookShelf.propTypes = {
    shelf: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    books: PropTypes.array,
    onShelfChanged: PropTypes.func.isRequired,
};

function Header(props) {
    return (
        <h2 className='bookshelf-title'>{props.title}</h2>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default BookShelf;
