import mongoose from 'mongoose';

const Post = new mongoose.Schema(
    {
        title: { type: String, required: false },
        photo: { type: String, required: true },
        date: { type: Date, required: true }
    },
    { versionKey: false }
)

export default mongoose.model('Post', Post);