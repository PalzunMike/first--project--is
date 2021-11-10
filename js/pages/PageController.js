import { popup } from '../Popup.js';
import { authCheck } from '../AuthCheck.js';
import { usersDataBase } from '../database/UsersDataBase.js';

export default class PageController {

    constructor() {
        this.authUserId = '1';
    }

    renderContent(element) {
        this.renderWelcomeMsg();
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

    renderWelcomeMsg() {  
        const autBlock = document.querySelector('.btn_block');
        const welcomeBlock = document.querySelector('.welcome_block');
        const welcomeMsg = document.querySelector('.welcome_message');
                
        if (authCheck.checkLoggedUser()){
            this.authUserId = authCheck.loggedUser._id;
            autBlock.classList.add('hide');
            welcomeMsg.textContent = ` ${authCheck.loggedUser.firstName} ${authCheck.loggedUser.secondName}`;
            welcomeBlock.classList.remove('hide');
        }else {
            welcomeMsg.textContent = ' ';
            autBlock.classList.remove('hide');
            welcomeBlock.classList.add('hide');
        }        
    }

    async quitUser() {        
        const loggedUser = authCheck.loggedUser;
        loggedUser.hasToken = "";
        await usersDataBase.updateUser(loggedUser);
        localStorage.removeItem('userData');
    }
}
