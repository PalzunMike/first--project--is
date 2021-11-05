import Router from "express";
import PostsController from "../controllers/PostsController.js";
import {upload} from "../file.js";

const router = new Router();

router.post('', upload.single('photo'), PostsController.add);
// router.post('/delete', PostsController.delete);

export default router;