import mongoose from 'mongoose';

const Post = new mongoose.Schema(
    {
        postTitle: { type: String, required: false },
        photo: { type: String, required: true}
    },
    { versionKey: false }
)

export default mongoose.model('Post', Post);