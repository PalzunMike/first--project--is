export default class Popup{
    openModalButtons = document.querySelectorAll('[data-modal-target]');
    closeModalButtons = document.querySelectorAll('[data-close-button]');
    overlay = document.getElementById('overlay');

    constructor(){
        this.addEventListenerOpen();
        this.addEventListenerClose();
        this.addEventListenerOverlay();
    }
    
   openModal(modal){
        const errors = document.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++){
            errors[i].nextSibling.style.boxShadow = 'none';
            errors[i].remove();            
        }        
        for (let i = 0; i < document.forms.length; i++){        
            document.forms[i].reset();
        }    
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
   }

   closeModal(modal){
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
   }

   addEventListenerOpen(){
    this.openModalButtons.forEach(button =>{
        button.addEventListener('click', () =>{
            const modal = document.querySelector(button.dataset.modalTarget);
            this.openModal(modal);
        })
    })
   }

   addEventListenerClose(){
    this.closeModalButtons.forEach(button =>{
        button.addEventListener('click', () =>{
            const modal = button.closest('.modal')
            this.closeModal(modal);
        })
    })
   }

   addEventListenerOverlay(){
    this.overlay.addEventListener('click', () =>{
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            this.closeModal(modal);
        });
    })
   }
}