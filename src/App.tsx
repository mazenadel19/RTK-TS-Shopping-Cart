import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { Home } from "./features/home/Home";
import { Cart } from "./features/cart/Cart";
import { CartLink } from "./features/cart/CartLink";
import { Products } from "./features/products/Products";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <nav>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
            <Link className={styles.navLink} to="/products">
              Products
            </Link>
            <CartLink />
          </nav>
        </header>
      </div>
      <div className="container mt-5">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
