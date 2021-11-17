import Router from "express";
import LikesController from "../controllers/LikesController.js";
import {checkToken} from "../middlewares/check-token.js";

const router = new Router();

router.post('', LikesController.addLike);
router.delete('', checkToken, LikesController.deleteLike);

export default router;