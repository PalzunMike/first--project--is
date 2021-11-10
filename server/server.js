import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/UsersRouter.js';
import postsRouter from './routes/PostsRouter.js';
import { PORT, DB_URL } from './config.js';

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();