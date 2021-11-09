import Router from "express";
import PostsController from "../controllers/PostsController.js";
import { upload } from "../middlewares/file.js";

const router = new Router();

router.post('', upload.single('photo'), PostsController.add);
router.get('', PostsController.getAll);
router.get('/:id', PostsController.getOne);
router.put('/:id', upload.single('photo'), PostsController.update);
router.delete('/:id', PostsController.delete);

export default router;