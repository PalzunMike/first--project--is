import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
    {
        authorId: { type: String, required: true },
        authorName: { type: String, required: true },
        text: { type: String, required: true },
        isAnswer: { type: String, required: false },
        date: { type: Date, required: true }
    },
    { versionKey: false }
)

export default mongoose.model('Comment', Comment);