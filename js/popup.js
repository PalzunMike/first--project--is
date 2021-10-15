import Form from './Form.js';
class Popup {
    element;

    openModalButtons = document.querySelectorAll('[data-modal-target]');
    closeModalButtons = document.querySelectorAll('[data-close-button]');
    overlay = document.getElementById('overlay');

    constructor() {
        this.singleTone();
        this.addEventListenerClose();
        this.addEventListenerOverlay();
    }

    singleTone() {
        if (Popup.instance instanceof Popup) {
            return Popup.instance;
        }
        Popup.instance = this;
    }

    openModal(modal) {
        Form.clearErrors();
        this.element = modal;
        this.clear(1);
        if (modal === null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    closeModal(modal) {
        if (modal === null) return
        modal.removeAttribute('id');
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    addEventListenerClose() {
        const modalWindows = document.querySelector('.modal');
        modal.addEventListener('click', (e) => {
            if (e.target.dataset.closeButton === '') {
                const modal = e.target.closest('.modal')
                this.closeModal(modal);
            }
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
        while (this.element.children.length > num) {
            this.element.removeChild(this.element.lastChild);
        }
    }
}

export const popup = new Popup();