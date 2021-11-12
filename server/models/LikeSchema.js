import mongoose from 'mongoose';

const Like = new mongoose.Schema(
    {
        author: { type: String, required: true }, 
        post: { type: String, required: true },      
        date: { type: Date, required: true }
    },
    { versionKey: false }
)

export default mongoose.model('Like', Like);