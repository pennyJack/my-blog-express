import React from 'react';
import { Link } from 'react-router-dom';
import articleContent from './article-content';

const ArticlesList = () => {
    return (
        <>
            <h1>Articles</h1>
            {articleContent.map((article, index) => (
                <Link className="article-list-item" key={index} to={`/article/${article.name}`}>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 151)}...</p>
                </Link>
            ))}
        </>
    );
}

export default ArticlesList;