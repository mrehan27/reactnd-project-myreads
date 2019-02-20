import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import * as Constants from './Constants'
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid';
import CircularIndeterminate from './CircularIndeterminate';

class SearchBook extends Component {

  static propTypes = {
    onShelfChanged: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    query: "",
  };

  handleQuery = (event) => {
    // Update state with new query
    let query = event.target.value;
    // Setting loading true so user can see progress earlier in case there were no results previously
    this.setState(() => ({
      loading: true,
      query: query,
    }));
    // Clear previous timeout added for user input delay
    clearTimeout(this.delayTimer);
    if (query.trim().length > 0) {
      // Set new timer for non-empty and new query only
      this.delayTimer = setTimeout(() => {
        // Get previous query of search results to avoid extra calls
        let previousQuery = this.state.searchResults ? this.state.searchResults.query.trim() : '';
        if (query.trim() !== previousQuery) {
          // Fetch results for new query only
          this.fetchResults(query.trim());
        } else {
          // Clear loading state for same query
          this.setState(() => ({
            loading: false,
          }));
        }
      }, 500);
    } else {
      // Clear results for empty query
      this.setState(() => ({
        loading: false,
        searchResults: undefined,
      }));
    }
  }

  fetchResults = (query) => {
    // Clear previous results before fetching new data
    const searchResults = { query: query, books: [] };
    this.setState(() => ({
      loading: true,
      searchResults: searchResults,
    }));
    // Fetch search results for the query
    BooksAPI.search(searchResults.query)
      .then(items => {
        // Make sure books has assigned only array value
        searchResults.books = (items && items instanceof Array) ? items : [];
        const { availableBooks } = this.props;
        // Assign shelves to books that were available already
        searchResults.books.forEach((book) => {
          if (availableBooks[book.id]) {
            book.shelf = availableBooks[book.id].shelf;
          }
        })
        // Updating state
        this.setState(() => ({
          loading: false,
          searchResults: searchResults,
        }));
      });
  }

  render() {
    const { loading, query, searchResults } = this.state;
    const { onShelfChanged } = this.props;
    // Check if no books found agains the query and query matches the current state
    const hasEmptyResult = searchResults && searchResults.books.length === 0 && searchResults.query === query.trim();
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <BackButton description="Close" />
          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={this.handleQuery} />
          </div>
        </div>
        <div className="search-books-results">
          {!loading && hasEmptyResult && (
            <h3 style={{ textAlign: 'center' }}>No results found for '{query}'</h3>
          )}
          {searchResults && searchResults.books.length > 0 && (
            <BooksGrid
              books={searchResults.books}
              onShelfChanged={onShelfChanged} />
          )}
          {loading && (
            <CircularIndeterminate color={Constants.COLOR_PRIMARY} />
          )}
        </div>
      </div>
    );
  }
}

function BackButton(props) {
  return (
    <Link className="close-search" to='/'>{props.description}</Link>
  );
}

BackButton.propTypes = {
  description: PropTypes.string.isRequired,
}

export default SearchBook;
