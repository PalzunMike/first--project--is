import Router from "express";
import CommentsController from "../controllers/CommentsController.js";
import { checkToken } from "../middlewares/check-token.js";

const router = new Router();

router.post('', CommentsController.addComment);
router.delete('/:id', checkToken, CommentsController.deleteComment);

export default router;