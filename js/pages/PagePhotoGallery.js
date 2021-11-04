import PageController from "./PageController.js";
import { usersDataBase } from "../database/UsersDataBase.js"
import { fileUpload } from '../database/FileLoader.js';

class PagePhotoGallery extends PageController{
    
    async renderPhotoGalleryPage() {
        const photoPageWrapper = document.createElement('div');
        photoPageWrapper.classList.add('photo_wrapper');
        const template = document.querySelector('#photo_template');
        const photoBlock = template.content.cloneNode(true);
        photoPageWrapper.append(photoBlock);        
        await this.renderContent(photoPageWrapper);
        await this.renderPhotoArea();
    }

    async renderPhotoArea() {
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = authUserObj.photo;
        const photoArea = document.querySelector('.photo_area');

        photoArray.forEach(photo => {
            const photoElementTempalte = document.querySelector('#photo_element_template');
            const photoElement = photoElementTempalte.content.cloneNode(true);
            const photoImg = photoElement.querySelector('.photo');
            photoImg.dataset.path = photo;
            photoImg.src = `http://localhost:5000/${photo}`;
            photoArea.append(photoElement);
        });
    }

    async deletePhoto(photoPath) {
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = authUserObj.photo;
        const photoIndex = photoArray.indexOf(photoPath);
        photoArray.splice(photoIndex, 1);
        authUserObj.photo = photoArray;
        await usersDataBase.updateUser(authUserObj);
        await fileUpload.deletePhoto(photoPath);
    }

}

export const pagePhotoGallery = new PagePhotoGallery();