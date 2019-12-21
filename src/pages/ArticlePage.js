import React from 'react';
import articleContent from './article-content';
import { useParams } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';

const ArticlePage = () => {
    const { name } = useParams();
    const article = articleContent.find(article => article.name === name) || null;
    const otherArticles = articleContent.filter(article => article.name !== name);

    if (!article) return <h1>Article doesn't exist!</h1>;

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;