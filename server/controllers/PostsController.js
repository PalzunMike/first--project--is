import fs from 'fs';
import Post from '../models/PostSchema.js';

class PostsController {
    async add(req, res) {
        try {
            const {postTitle} = req.body;

            const post = await Post.create({ postTitle, photo: req.file.path });

            res.status(201).json({ postId: post.id });
                       
        } catch (e) {
            console.log(e);
        }
    }

    // async delete(req, res) {
    //     try {
    //         const { path } = req.body;
    //         fs.unlink(path, function (err) {
    //             if (err) return console.log(err);
    //             console.log('file deleted successfully');
    //         });
    //         res.end();

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export default new PostsController();