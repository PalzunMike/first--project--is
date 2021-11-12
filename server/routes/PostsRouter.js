import Router from "express";
import PostsController from "../controllers/PostsController.js";
import {checkToken} from "../middlewares/check-token.js";
import { upload } from "../middlewares/file.js";

const router = new Router();

router.post('', upload.single('photo'), checkToken, PostsController.add);
router.get('', PostsController.getAll);
router.get('/:id', PostsController.getOne);
router.put('/:id', upload.single('photo'), checkToken, PostsController.update);
router.put('/updateLike/:id', PostsController.updateForLikes);
router.delete('/:id', checkToken, PostsController.delete);

export default router;