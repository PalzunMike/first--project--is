import { storage } from './Storage.js'
import EnterForm from './Enter-form.js';
import RegisterForm from './Register-form.js';
import EditForm from './Edit-form.js';
import { popup } from './Popup.js';

export default class Page {

    renderUsers() {
        const modalActive = document.querySelector('.active');

        popup.closeModal(modalActive);

        const localStorageUserObj = storage.getObjectOnStorage('users');
        const listUsers = document.querySelector('.content');
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

    quitUser() {
        // debugger;
        const localStorageUserObj = storage.getObjectOnStorage('users');

        for (let user in localStorageUserObj) {
            localStorageUserObj[user].userActive = false;
            storage.setObjectOnStorage(`users`, localStorageUserObj);
        }

        const listUsers = document.querySelector('.content');

        while (listUsers.children.length > 0) {
            listUsers.removeChild(listUsers.lastChild);
        }

        const welcomeMsg = document.querySelector('.welcome_message');
        welcomeMsg.textContent = ' ';

        const autBlock = document.querySelector('.btn_block');
        autBlock.classList.remove('hide');

        const welcomeBlock = document.querySelector('.welcome_block');
        welcomeBlock.classList.add('hide');

    }
}