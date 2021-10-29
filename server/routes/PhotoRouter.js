import Router from "express";
import PhotoController from "../controllers/PhotoController.js";
import multer from "../file.js";

const router = new Router();

router.post('', PhotoController.add);
// router.get('', PhotoController.getAll);
// router.get('/:id', PhotoController.getOne);
// router.delete('/:id', PhotoController.delete);

export default router;