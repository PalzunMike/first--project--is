import Like from '../models/LikeSchema.js';

class PostsController {
    async addLike(req, res) {
        try {
            const { author, post } = req.body;
            console.log(author, post);
            const dateLike = new Date().toISOString();
            const like = await Like.create({ author, post, date: dateLike });
            res.status(201).json({ likeId: like.id });
        } catch (e) {
            console.log(e);
        }
    }

    // async getAll(req, res) {
    //     try {
    //         const posts = await Post.find();

    //         posts.forEach(post => {
    //             const photo = fs.readFileSync(post.photo, { encoding: 'base64' });
    //             post.photo = photo;
    //         })
    //         const sortPosts = posts.sort(function (a,b){
    //             return new Date(a.date) - new Date(b.date);
    //         })
    //         return res.json(sortPosts);
    //     } catch (e) {
    //         console.log(e.message);
    //         res.status(500).json(e);
    //     }
    // }

    // async getOne(req, res) {
    //     try {
    //         const { id } = req.params;
    //         if (!id) {
    //             res.status(400).json({ message: 'ID не указан' })
    //         }
    //         const post = await Post.findById(id);
    //         const photo = fs.readFileSync(post.photo, { encoding: 'base64' });
    //         post.photo = photo;
    //         return res.json(post);
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // }

    // async update(req, res) {
    //     try {
    //         const { id } = req.params;
    //         if (!id) {
    //             res.status(400).json({ message: 'ID не указан' })
    //         }
    //         const { title } = req.body;
    //         let post = {};
    //         if (req.file) {
    //             post = { title, photo: req.file.path };
    //             const oldPost = await Post.findById(id);
    //             fs.unlink(oldPost.photo, function (err) {
    //                 if (err) return console.log(err);
    //                 console.log('file deleted successfully');
    //             });
    //         }
    //         post.title = title;
    //         const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });
    //         return res.json(updatePost);
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // }

    async deleteLike(req, res) {
        try {
            const { author, post } = req.body;
            console.log(author, post);
            const like = await Like.findOne({ author:author});
            return res.json(like);

        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new PostsController();