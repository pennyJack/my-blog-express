import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import { useParams } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
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

    if (!article) return <NotFoundPage />;

    return (
        <>
            <h1>{article.title}</h1>
            <UpvotesSection
                articleName={name}
                setArticleInfo={setArticleInfo}
                upvotes={articleInfo.upvotes}
            />
            {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm
                articleName={name}
                setArticleInfo={setArticleInfo}
            />
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;