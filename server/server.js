import express from 'express';
import mongoose from 'mongoose';
import Post from './object-BD.js';
import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URL = 'mongodb+srv://admin:root@cluster0.2dkyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(fileUpload({}));

app.post('/', async (req, res) => {
    try{   
        console.log(req.files);     
        // const post = await Post.create(req.body, req.files.picture);
        res.json(req.files);
    } catch (e){
        res.status(500).json(e);
    }
    
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();




// const http = require('http');

// const server = http.createServer();

// server.on('request', (req, res) => {
//     res.end('My name Michael');
// })

// server.listen(5000, () => console.log('Server start'));