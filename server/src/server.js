import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

// Helper function to connect api endpoint to the database
const withDB = async (res, callback) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        await callback(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
};

// Get an article document from the database
app.get('/api/articles/:name', (req, res) => {
    withDB(res, async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(articleInfo);
    });
});

// Upvoting blog articles
app.post('/api/articles/:name/upvote', (req, res) => {
    withDB(res, async (db) => {
        const articleName = req.params.name;
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
    });
});

// Adding comments
app.post('/api/articles/:name/add-comment', (req, res) => {
    withDB(res, async (db) => {
        const articleName = req.params.name;
        const { username, text } = req.body;

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $push: { comments: { username, text } },
                $currentDate: { lastModified: true }
            }
        );

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    });
});

app.listen(8000, () => console.log('Listening on port 8000'));