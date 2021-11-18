import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Post = new mongoose.Schema(
    {
        title: { type: String, required: false },
        photo: { type: String, required: true },
        likesAuthor: { type: Array, required: false },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        date: { type: Date, required: true }
    },
    { versionKey: false }
)
export default mongoose.model('Post', Post);