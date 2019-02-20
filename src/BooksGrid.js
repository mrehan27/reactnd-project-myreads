import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import BookItem from './BookItem';

function BooksGrid(props) {
    return (
        <ol className="books-grid">
            {props.books.map((book) =>
                <li key={book.id}>
                    <BookItem book={book} onShelfChanged={props.onShelfChanged} />
                </li>
            )}
        </ol>
    );
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
}

BooksGrid.defaultProps = {
    books: [],
}

export default BooksGrid;
