import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import { List } from './components/List';
import { Nav } from './components/Nav';
import { Edit } from './components/Edit';
import { New } from './components/New';
import { Preview } from './components/Preview';

function App() {
  return (
    <Router>
      <h1 className={styles.title}>
        <Link to="/">Serwis samochodowy</Link>
      </h1>
      <Switch>
        <Route path="/nowy">
          <New />
        </Route>
        <Route path="/:id/edytuj">
          <Edit />
        </Route>
        <Route path="/:id">
          <Preview />
        </Route>
        <Route path="/">
          <Nav />
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
