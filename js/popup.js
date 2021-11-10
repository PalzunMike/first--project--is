import Form from './forms/Form.js';
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
        Form.clearInput();
        this.element = modal;
        this.clear(1);
        if (modal === null) return
        modal.classList.add('active');
        overlay.classList.add('visible');
    }

    openGallery(photo) {
        this.element = photo;
        if (photo === null) return
        photo.classList.add('select');
        overlay.classList.add('visible');
        const closeBtn = photo.querySelector('.close-btn');
        const deleteBtn = photo.querySelector('.delete-post');
        const editBtn = photo.querySelector('.edit-post');
        deleteBtn.style.zIndex = '1';
        editBtn.style.zIndex = '1';
        closeBtn.style.zIndex = '1';
    }

    closeModal(modal) {
        if (modal === null) return
        modal.removeAttribute('id');
        modal.classList.remove('active');
        overlay.classList.remove('visible');

    }

    closeGallery(photo) {
        if (photo === null) return
        photo.classList.remove('select');
        overlay.classList.remove('visible');
        const closeBtn = photo.querySelector('.close-btn');
        const deleteBtn = photo.querySelector('.delete-post');
        const editBtn = photo.querySelector('.edit-post');        
        editBtn.style.zIndex = '-1';
        deleteBtn.style.zIndex = '-1';
        closeBtn.style.zIndex = '-1';
    }

    addEventListenerClose() {
        modal.addEventListener('click', (e) => {
            if (e.target.dataset.closeButton === '') {
                const modal = e.target.closest('.modal')
                this.closeModal(modal);
            }
        });
    }

    addEventListenerOverlay() {
        this.overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                this.closeModal(modal);
            });

            const photos = document.querySelectorAll('.select');
            photos.forEach(photo => {
                this.closeGallery(photo);
            })
        })
    }
    clear(num) {
        while (this.element.children.length > num) {
            this.element.removeChild(this.element.lastChild);
        }
    }
}

export const popup = new Popup();