import Page from "./PageRender.js";
import { template } from "../TemplateEngine.js";
import PhotoForm from "../forms/Photo-form.js";
import { usersDataBase } from "../database/CollectionUsersDataBase.js"
import { fileUpload } from '../database/FileUpload.js';
// import { upload } from "../../server/file.js";

class Content extends Page {

    async renderAboutMe() {
        const templateAbout = await template.setTemplate('./templates/about-me-template.html');
        this.renderContent(templateAbout);
    }

    async renderEdit() {
        const dataUsers = await usersDataBase.getAllUsers();
        const template = document.querySelector('#user_template');
        const userLogin = template.content.querySelector('.user_login');
        const userBlock = template.content.querySelector('.user');

        const usersWrapper = document.createElement('div');
        usersWrapper.classList.add('users_wrapper');

        for (let user of dataUsers) {
            userLogin.textContent = user.login;
            userBlock.dataset.id = user._id;
            let userElement = template.content.cloneNode(true);
            usersWrapper.append(userElement);
        }
        this.renderContent(usersWrapper);
    }

    async renderPhotoPage() {
        const photoPageWrapper = document.createElement('div');
        photoPageWrapper.classList.add('photo_wrapper');
        const template = document.querySelector('#photo_template');
        const photoBlock = template.content.cloneNode(true);
        photoPageWrapper.append(photoBlock);
        await this.renderContent(photoPageWrapper);

        await this.renderPhoto();
    }

    async renderPhoto() {
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

    renderHome() {
        const mainContent = document.createElement('h3');
        mainContent.textContent = 'Main Content'
        this.renderContent(mainContent);
    }
}

export const content = new Content();