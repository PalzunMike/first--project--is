import Router from "express";
import UsersController from "../controllers/UsersController.js";

const router = new Router();

router.post('/register', UsersController.register);
router.post('/auth', UsersController.auth);
router.get('', UsersController.getAll);
router.get('/:id', UsersController.getOne);
router.put('', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;