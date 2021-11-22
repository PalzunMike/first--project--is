import PageController from "./PageController.js";
import { usersDataLayer } from "../database/UsersDataLayer.js"

class PageEditUsers extends PageController {

    async renderEditUsersPage() {
        const dataUsers = await usersDataLayer.getAllUsers();
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
}

export const pageEditUsers = new PageEditUsers();