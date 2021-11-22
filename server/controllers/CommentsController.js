import Comment from '../models/CommentSchema.js';
import Post from '../models/PostSchema.js';

class CommentsController {
    async addComment(req, res) {
        try {
            const { authorId, authorName, text, postId, isAnswer } = req.body;
            const dateLike = new Date().toISOString();
            const comment = await Comment.create({ authorId, authorName, text, date: dateLike, isAnswer });
            const post = await Post.findByIdAndUpdate(postId, {
                $addToSet: { comments: comment._id }
            },
                { new: true }).populate('comments').sort({ date: 1 });
            res.status(201).json(post);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteComment(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByIdAndDelete(id);
            const post = await Post.findOneAndUpdate({ comments: id }, {
                $pull: { comments: id }
            })
            return res.json(post);

        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new CommentsController();