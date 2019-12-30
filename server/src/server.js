import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

// Get an article document from the database
app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(articleInfo);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

// Upvoting blog articles
app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        articleInfo.upvotes += 1;

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $set: { upvotes: articleInfo.upvotes },
                $currentDate: { lastModified: true }
            }
        );

        res.status(200).json(articleInfo);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

// Adding comments
app.post('/api/articles/:name/add-comment', async (req, res) => {
    try {
        const { username, text } = req.body;
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        let articleInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $push: { comments: { username, text } },
                $currentDate: { lastModified: true }
            }
        );

        articleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(articleInfo);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

app.listen(8000, () => console.log('Listening on port 8000'));