import React from "react";
import styles from "./Home.module.css";

export function Home() {
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
