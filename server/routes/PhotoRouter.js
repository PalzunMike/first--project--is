import Router from "express";
import PhotoController from "../controllers/PhotoController.js";
import {upload} from "../file.js";

const router = new Router();

router.post('', upload.single('photo'), PhotoController.add);

export default router;