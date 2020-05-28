import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Bookshelves from "./components/Bookshelves";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Bookshelves} />
            <Route path="/search" component={Search} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
