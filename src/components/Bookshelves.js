import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import Shelf from "./Shelf";

class Bookshelves extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    BooksAPI.getAll().then((ajax) => {
      this.setState({
        books: ajax,
      });
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

  render() {
    return (
      <>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Shelf
            title={"Currently Reading"}
            updateBook={this.updateBook}
            book={this.state.books.filter(
              (book) => book.shelf === "currentlyReading"
            )}
          />
          <Shelf
            title={"Want to Read"}
            updateBook={this.updateBook}
            book={this.state.books.filter(
              (book) => book.shelf === "wantToRead"
            )}
          />
          <Shelf
            title={"Read"}
            updateBook={this.updateBook}
            book={this.state.books.filter((book) => book.shelf === "read")}
          />

          <div className="open-search">
            <button>
              <Link className="search-link" to="/search">
                Add a book
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Bookshelves;
