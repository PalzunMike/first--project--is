import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        cb(null, (Math.round(Math.random() * 1E9)) + file.originalname);
    }
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)){
        cb (null, true);
    }else {
        cb (null, false);
    }   
};

export const upload = multer({storage, fileFilter});