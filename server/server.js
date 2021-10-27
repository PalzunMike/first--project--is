import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/UsersRouter.js';
import {PORT, DB_URL} from './config.js'
// import fileUpload from 'express-fileupload';



const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/users', usersRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();