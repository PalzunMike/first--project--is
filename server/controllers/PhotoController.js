

class PhotoController {
    async add(req, res) {
        try {            
            res.json(req.file.path);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new PhotoController();