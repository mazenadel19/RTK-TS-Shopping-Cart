import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import { getMemoizedNumItems } from "../../store/reducers/CartSlice";
import styles from "./CartLink.module.css";

export function CartLink() {
  const CartItems = useAppSelector(getMemoizedNumItems);

  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        <span>🛒</span> <span>{CartItems || "Cart"}</span>
      </span>
    </Link>
  );
}
