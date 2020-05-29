import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: "",
      results: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((ajax) => {
      this.setState({ books: ajax });
    });
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat(book),
      }));
    });
  };

  updateQuery = (query) => {
    this.setState(
      {
        query: query,
      },
      this.handleSubmit
    );
  };

  handleSubmit() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then((res) => {
      if (res.error) {
        return this.setState({ results: [] });
      } else {
        res.forEach((book) => {
          let i = this.state.books.filter((Book) => Book.id === book.id);
          if (i[0]) {
            book.shelf = i[0].shelf;
          }
        });
        return this.setState({ results: res });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, key) => (
              <Book updateBook={this.updateBook} book={book} key={key} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
