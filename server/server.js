import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './UserRouter.js';
// import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URL = 'mongodb+srv://admin:root@cluster0.4pzv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api', router);
// app.use(fileUpload({}));

// app.post('/',)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();