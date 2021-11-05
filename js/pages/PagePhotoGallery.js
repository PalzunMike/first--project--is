import PageController from "./PageController.js";
import { authCheck } from "../AuthCheck.js";
import { usersDataBase } from "../database/UsersDataBase.js"
import { postsDataBase } from '../database/PostsDataBase.js';

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
        const photoArea = document.querySelector('.photo_area');
        const photoArray = await this.getPhotoArray();
        
        photoArray.forEach(photo => {
            const photoElementTempalte = document.querySelector('#photo_element_template');
            const photoElement = photoElementTempalte.content.cloneNode(true);
            const photoImg = photoElement.querySelector('.photo');
            photoImg.dataset.path = photo;
            photoImg.src = `data:image/jpeg;base64, ${photo}`;
            photoArea.append(photoElement);
        });
    }

    async getPhotoArray(){
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        // console.log(authUserObj);
        const photoArray = authUserObj.photo;
        // console.log(photoArray);
        return photoArray;
        // const decodePhotoArray = photoArray.map(item => decodeURIComponent(escape(window.atob(item))));
        // return decodePhotoArray;
    }

    async deletePhoto(photoSrc) {
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = await this.getPhotoArray();
        const photoIndex = photoArray.indexOf(photoSrc);
        // console.log(photoIndex);
        const decodePhoto = await atob(photoSrc);
        console.log(decodePhoto);
        // photoArray.splice(photoIndex, 1);
        authUserObj.photo = `${photoIndex}`;
        console.log(authUserObj);
        await usersDataBase.deletePhoto(photoSrc);
        // await fileUpload.deletePhoto(photoPath);
    }

}

export const pagePhotoGallery = new PagePhotoGallery();