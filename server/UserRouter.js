import Router  from "express";
import UsersController from "./UsersController.js";

const router = new Router();

router.post('/users/register', UsersController.register);
router.post('/users/auth', UsersController.auth);
router.get('/users', UsersController.getAll);
router.get('/users/:id', UsersController.getOne);
router.put('/users', UsersController.update);
router.delete('/users/', UsersController.delete);

export default router;