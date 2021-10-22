import Router  from "express";
import UsersController from "./UsersController.js";

const router = new Router();

router.post('/users', UsersController.add);
router.get('/users', UsersController.getAll);
router.get('/users/:login', UsersController.getOne);
router.put('/users', UsersController.update);
router.delete('/users/:login', UsersController.delete);

export default router;