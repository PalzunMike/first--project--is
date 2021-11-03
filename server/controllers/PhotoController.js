import fs from 'fs';

class PhotoController {
    async add(req, res) {
        try {            
            res.json(req.file.path);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res) {
        try {   
            const {path} = req.body;       
            fs.unlink(path, function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           }); 
            
        } catch (e) {
            console.log(e);
        }
    }
}

export default new PhotoController();