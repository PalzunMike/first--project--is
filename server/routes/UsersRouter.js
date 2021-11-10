import Router from "express";
import UsersController from "../controllers/UsersController.js";
import {checkToken} from "../middlewares/check-token.js";

const router = new Router();

router.post('/register', UsersController.register);
router.post('/auth', UsersController.auth);
router.get('', UsersController.getAll);
router.get('/:id', checkToken, UsersController.getOne);
router.put('', checkToken, UsersController.update);
router.delete('/:id', checkToken, UsersController.delete);

export default router;