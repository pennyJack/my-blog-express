import React from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './article-content';

const ArticlePage = () => {
    const { name } = useParams();
    const article = articleContent.find(article => article.name === name) || null;

    if (!article) return <h1>Article doesn't exist!</h1>;

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </>
    );
}

export default ArticlePage;