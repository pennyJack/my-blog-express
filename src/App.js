import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar.js';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/about-me">
              <AboutMe />
            </Route>
            <Route path="/articles-list">
              <ArticlesListPage />
            </Route>
            <Route path="/article/:name">
              <ArticlePage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
