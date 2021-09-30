import { Form } from './form.js';


export default class Popup {
    openModalButtons = document.querySelectorAll('[data-modal-target]');
    closeModalButtons = document.querySelectorAll('[data-close-button]');
    overlay = document.getElementById('overlay');


    constructor() {
        if (Popup.instance instanceof Popup) {
            return Popup.instance;
        }
        Popup.instance = this;
        // this.addEventListenerOpen();
        this.addEventListenerClose();
        this.addEventListenerOverlay();
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

    // addEventListenerOpen() {
    //     this.openModalButtons.forEach(button => {
    //         button.addEventListener('click', () => {
    //             const modal = document.querySelector(button.dataset.modalTarget);
    //             this.openModal(modal);
    //         })
    //     })
    // }

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
}