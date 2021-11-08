import fs from 'fs';
import Post from '../models/PostSchema.js';

class PostsController {
    async add(req, res) {
        try {
            const { title } = req.body;
            const post = await Post.create({ title, photo: req.file.path });
            res.status(201).json({ postId: post.id });
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.find();
            posts.forEach(post => {
                const photo = post.photo.map(item => fs.readFileSync(item, { encoding: 'base64' }));
                post.photo = photo;
            })
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' })
            }
            const post = await Post.findById(id);
            const photo = fs.readFileSync(post.photo, { encoding: 'base64' });
            post.photo = photo;
            return res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' })
            }
            const post = await Post.findByIdAndDelete(id);

            fs.unlink(post.photo, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });

            return res.json(post);

        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new PostsController();