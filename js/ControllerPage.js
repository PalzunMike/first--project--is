// import { storage } from './Storage.js'
import { template } from "./TemplateEngine.js";
import { popup } from './Popup.js';
import { dataBase } from './DataBase.js'

class Page {

    loginUser = false;

    async renderAdminPage() {
        const modalActive = document.querySelector('.active');
        popup.closeModal(modalActive);

        const listUsers = document.querySelector('.content');
        page.clearElement(listUsers);

        const dataUsers = await dataBase.getAllUsers();
        const template = document.querySelector('#user_template');
        const userLogin = template.content.querySelector('.user_login');
        const userBlock = template.content.querySelector('.user');
        const autBlock = document.querySelector('.btn_block');
        autBlock.classList.add('hide');

        for (let user of dataUsers) {
            userLogin.textContent = user.login;
            userBlock.dataset.id = user._id;
            let userEl = template.content.cloneNode(true);
            listUsers.append(userEl);
        }

        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData.userId;
        const authUser = await dataBase.getOneUser(userId);

        const welcomeMsg = document.querySelector('.welcome_message');
        welcomeMsg.textContent = ` ${authUser.firstName} ${authUser.secondName}`
        const welcomeBlock = document.querySelector('.welcome_block');
        welcomeBlock.classList.remove('hide');
    }

    renderHomePage() {

        const listUsers = document.querySelector('.content');
        page.clearElement(listUsers);

        const cont = document.createElement('h3');
        cont.textContent = 'Main Content'
        listUsers.append(cont);

        if (page.loginUser === false) {
            const welcomeMsg = document.querySelector('.welcome_message');
            welcomeMsg.textContent = ' ';

            const autBlock = document.querySelector('.btn_block');
            autBlock.classList.remove('hide');

            const welcomeBlock = document.querySelector('.welcome_block');
            welcomeBlock.classList.add('hide');
        }
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

    enterUser() {
        const loginUser = localStorage.getItem('userData');
        if (loginUser) {
            page.loginUser = true;
        }
    }

    quitUser() {
        localStorage.removeItem('userData');
        page.loginUser = false;
    }
}

export const page = new Page();