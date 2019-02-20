import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import * as Constants from './Constants';
import ControlMenu from './ControlMenu';

const shelfControlOptions = [
    { value: "", text: "Move to...", disabled: true },
    { value: Constants.SHELF_TYPE_CURRENTLY_READING, text: "Currently Reading" },
    { value: Constants.SHELF_TYPE_WANT_TO_READ, text: "Want to Read" },
    { value: Constants.SHELF_TYPE_READ, text: "Read" },
    { value: Constants.SHELF_TYPE_NONE, text: "None" },
];

function BookItem(props) {
    let { book, onShelfChanged } = props;
    let coverImage = (book.imageLinks && book.imageLinks.smallThumbnail) ? `url(${book.imageLinks.smallThumbnail})` : "";
    let currentShelf = book.shelf ? book.shelf : Constants.SHELF_TYPE_NONE;
    let authors = book.authors ? book.authors : [];
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: coverImage }} />
                <ControlMenu
                    className="book-shelf-changer"
                    options={shelfControlOptions}
                    value={currentShelf}
                    onOptionChanged={(event) => onShelfChanged(book, event.target.value)} />
            </div>
            <div className="book-title">{book.title}</div>
            {authors.map((author) => <Author key={author} name={author} />)}
        </div>
    );
}

BookItem.propTypes = {
    book: PropTypes.shape({
        imageLinks: PropTypes.shape({
            smallThumbnail: PropTypes.string,
        }),
        title: PropTypes.string.isRequired,
        shelf: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onShelfChanged: PropTypes.func.isRequired,
};

function Author(props) {
    return (
        <div className="book-authors">{props.name}</div>
    );
}

Author.propTypes = {
    name: PropTypes.string.isRequired,
};

export default BookItem;
