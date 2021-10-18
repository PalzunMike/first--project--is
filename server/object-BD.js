import mongoose from 'mongoose';

const Post = new mongoose.Schema ({
    author: {type: String},
    title: {type: String},
    content: {type: String},
    picture: {type: String}
})

export default mongoose.model('Post', Post);