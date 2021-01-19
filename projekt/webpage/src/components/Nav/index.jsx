import React from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/nowy" className={styles.link}>
        + Dodaj nowy samochód
      </Link>
    </nav>
  );
};
