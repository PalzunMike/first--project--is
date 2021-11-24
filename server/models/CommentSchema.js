import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema(
    {
        authorId: { type: String, required: true },
        authorName: { type: String, required: true },
        text: { type: String, required: true },
        isAnswer: { type: String, required: false },
        hasAnswer: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        date: { type: Date, required: true }
    },
    { versionKey: false }
)

export default mongoose.model('Comment', Comment);