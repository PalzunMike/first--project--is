import { popup } from '../Popup.js';
import { usersDataBase } from '../database/CollectionUsersDataBase.js'

export default class Page {

    constructor(){
        this.authUserId = '1';
        // console.log(this.authUserId);
    }    

    renderContent(element) {
        this.checkLoggedUser();
        const modalActive = document.querySelector('.active');
        popup.closeModal(modalActive);
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
            this.authUserId = userData.userId;  
            console.log(this.authUserId);          
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
