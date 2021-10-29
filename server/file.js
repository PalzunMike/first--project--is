import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads/')
    },
    filename(req, file, cb){
        cb(null, Math.random() + file.originalname)
    }
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetypes)){
        cb (null, true);
    }else {
        cb (null, false);
    }   
};

export default multer({storage, filename, fileFilter});