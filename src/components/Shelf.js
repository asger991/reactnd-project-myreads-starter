import React, { Component } from "react";
import Book from "./Book";

class Shelf extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.book.map((book, key) => (
              <Book updateBook={this.props.updateBook} book={book} key={key} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
