import Page from "./PageRender.js";
import { template } from "../TemplateEngine.js";
import PhotoForm from "../forms/Photo-form.js";
import { usersDataBase } from "../database/CollectionUsersDataBase.js"

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

    async renderPhoto(){
        const photoWrapper = document.createElement('div');
        photoWrapper.classList.add('photo_wrapper');
        const template = document.querySelector('#photo_template');
        const photoBlock = template.content.cloneNode(true);         
        photoWrapper.append(photoBlock);

        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = authUserObj.photo;
        const photoArea = photoWrapper.querySelector('.photo_area');

        photoArray.forEach(photo => {
            console.log(photo);
            const userPhoto = document.createElement('img');
            userPhoto.src = `http://localhost:5000/${photo}`;
            userPhoto.classList.add('photo_element');
            photoArea.append(userPhoto);
        });
       
        this.renderContent(photoWrapper);
    }

    renderHome() {
        const mainContent = document.createElement('h3');
        mainContent.textContent = 'Main Content'
        this.renderContent(mainContent);
    }
}

export const content = new Content();