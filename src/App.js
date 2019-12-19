import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import ArticlesList from './pages/ArticlesList';
import ArticlePage from './pages/ArticlePage';


function App() {
  return (
    <Router>
      <div className="App">
        <div id="page-body">
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about-me">
            <AboutMe />
          </Route>
          <Route path="/articles-list">
            <ArticlesList />
          </Route>
          <Route path="/article">
            <ArticlePage />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;