import Form  from './Form.js';


export default class Popup {
    openModalButtons = document.querySelectorAll('[data-modal-target]');
    closeModalButtons = document.querySelectorAll('[data-close-button]');
    overlay = document.getElementById('overlay');


    constructor() {
        this.singleTone();
        this.addEventListenerClose();
        this.addEventListenerOverlay();
    }

    singleTone(){
        if (Popup.instance instanceof Popup) {
            return Popup.instance;
        }
        Popup.instance = this;
    }

    openModal(modal) {
        Form.clearErrors();
        if (modal === null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    closeModal(modal) {
        if (modal === null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }    

    addEventListenerClose() {
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal')
            this.closeModal(modal);
        })
    }

    addEventListenerOverlay() {
        this.overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                this.closeModal(modal);
            });
        })
    }
    clear(num) {
        while (this.children.length > num) {
            this.removeChild(element.lastChild);
        }
    }
}