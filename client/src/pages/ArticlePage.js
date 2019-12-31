import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import { useParams } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: []
    });

    const { name } = useParams();
    const article = articleContent.find(article => article.name === name) || null;
    const otherArticles = articleContent.filter(article => article.name !== name);

    useEffect(() => {
        (async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        })()
    }, [name]);

    if (!article) return <NotFoundPage></NotFoundPage>;

    return (
        <>
            <h1>{article.title}</h1>
            <p>This post has been upvoted: {articleInfo.upvotes} times</p>
            {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;