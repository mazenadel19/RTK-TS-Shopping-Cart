import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
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

function Home() {
  return (
    <main className="page">
      <h1>Welcome to the Store</h1>
      <figure>
        <img
          src="/store.jpg"
          alt="A large old storefront"
          className={styles.storeImg}
        />
        <figcaption>Gary Houston, CC0, via Wikimedia Commons</figcaption>
      </figure>
    </main>
  );
}
