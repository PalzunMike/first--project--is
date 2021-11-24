import Comment from '../models/CommentSchema.js';
import Post from '../models/PostSchema.js';

class CommentsController {
    async addComment(req, res) {
        try {
            const { authorId, authorName, text, postId, isAnswer } = req.body;
            const dateComment = new Date().toISOString();
            const comment = await Comment.create({ authorId, authorName, text, date: dateComment, isAnswer });
            if (isAnswer) {
                const commentedComment = await Comment.findByIdAndUpdate(isAnswer, {
                    $addToSet: { hasAnswer: comment._id }
                });
            }
            const post = await Post.findByIdAndUpdate(postId, {
                $addToSet: { comments: comment._id }
            },
                { new: true }).populate('comments');
            res.status(201).json(post);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteComment(req, res) { 
        try {
            const { id } = req.params;
            const comment = await Comment.findByIdAndDelete(id);
            const commentedComment = await Comment.findOneAndUpdate ( {hasAnswer: id}, {
                $pull: {hasAnswer: id}
            })
            const answer = await Comment.deleteMany({ isAnswer: id });
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