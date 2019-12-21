import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar.js';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
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
        </div>
      </div>
    </Router>
  );
}

export default App;
