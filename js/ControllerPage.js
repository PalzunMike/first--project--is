import { storage } from './Storage.js'
import { template } from "./TemplateEngine.js";
import { popup } from './Popup.js';

class Page {

    renderAdminPage() {
        const modalActive = document.querySelector('.active');
        popup.closeModal(modalActive);

        const listUsers = document.querySelector('.content');
        page.clearElement(listUsers);

        const localStorageUserObj = storage.getObjectOnStorage('users');
        const template = document.querySelector('#user_template');
        const userLogin = template.content.querySelector('.user_login');
        const userBlock = template.content.querySelector('.user');
        const autBlock = document.querySelector('.btn_block');
        autBlock.classList.add('hide');

        for (let user in localStorageUserObj) {
            const welcomeMsg = document.querySelector('.welcome_message');

            userLogin.textContent = user;
            userBlock.dataset.login = user;
            let userEl = template.content.cloneNode(true);
            listUsers.append(userEl);

            if (localStorageUserObj[user].userActive === true) {
                const firstName = localStorageUserObj[user].firstName;
                const lastName = localStorageUserObj[user].secondName;

                welcomeMsg.textContent = ` ${firstName} ${lastName}`;
            }
        }
        const welcomeBlock = document.querySelector('.welcome_block');
        welcomeBlock.classList.remove('hide');
    }

    renderHomePage() {
        const listUsers = document.querySelector('.content');
        page.clearElement(listUsers);

        const welcomeMsg = document.querySelector('.welcome_message');
        welcomeMsg.textContent = ' ';

        const autBlock = document.querySelector('.btn_block');
        autBlock.classList.remove('hide');

        const welcomeBlock = document.querySelector('.welcome_block');
        welcomeBlock.classList.add('hide');
    }

    async renderAboutMePage() {
        const content = document.querySelector('.content');
        const templatePage = await template.setTemplate('./templates/about-me-template.html');
        page.clearElement(content);
        content.insertAdjacentHTML('beforeend', templatePage);
    }

    clearElement(element) {
        while (element.children.length > 0) {
            element.removeChild(element.lastChild);
        };
    }

    quitUser() {
        const localStorageUserObj = storage.getObjectOnStorage('users');

        for (let user in localStorageUserObj) {
            localStorageUserObj[user].userActive = false;
            storage.setObjectOnStorage(`users`, localStorageUserObj);
        }
    }
}

export const page = new Page();