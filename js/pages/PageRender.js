import { popup } from '../Popup.js';
import { usersDataBase } from '../database/CollectionUsersDataBase.js'

export default class Page {

    constructor() {
        this.authUserId = '1';
        // console.log(this.authUserId);
    }

    renderContent(element) {
        this.checkLoggedUser();
        const modalActive = document.querySelector('.active');
        const gallery = document.querySelector('.select');
        if (modalActive) {
            popup.closeModal(modalActive);
        } else {
            popup.closeGallery(gallery);
        }
        const content = document.querySelector('.content');
        this.clearElement(content);
        const isDOMElement = element instanceof Element;
        if (isDOMElement) {
            content.append(element);
        } else {
            content.insertAdjacentHTML('afterbegin', element);
        }
    }

    clearElement(element) {
        while (element.children.length > 0) {
            element.removeChild(element.lastChild);
        };
    }

    async checkLoggedUser() {
        const loginUser = localStorage.getItem('userData');
        const autBlock = document.querySelector('.btn_block');
        const welcomeBlock = document.querySelector('.welcome_block');
        const welcomeMsg = document.querySelector('.welcome_message');

        if (loginUser) {
            const userData = JSON.parse(loginUser);
<<<<<<< Updated upstream

            this.token = userData.token;
            console.log(this.token);

            let base64Url = this.token.split('.')[1]; // token you get
            let base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            let decodedData = JSON.parse(base64);

            console.log(decodedData);

=======
>>>>>>> Stashed changes
            this.authUserId = userData.userId;
            const authUser = await usersDataBase.getOneUser(this.authUserId);
            autBlock.classList.add('hide');
            welcomeMsg.textContent = ` ${authUser.firstName} ${authUser.secondName}`;
            welcomeBlock.classList.remove('hide');
            return true;
        } else {
            welcomeMsg.textContent = ' ';
            autBlock.classList.remove('hide');
            welcomeBlock.classList.add('hide');
            return false;
        }
    }

    quitUser() {
        localStorage.removeItem('userData');
    }
}

// export const page = new Page();
