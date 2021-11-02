import EnterForm from './forms/Enter-form.js';
import RegisterForm from './forms/Register-form.js';
import EditForm from './forms/Edit-form.js';
import PhotoForm from './forms/Photo-form.js';
import { popup } from './Popup.js';
import { router } from './Router.js';
// import { page } from './pages/PageRender.js';
import { content } from './pages/ContentRender.js';

const modal = document.querySelector('.modal');
const btnBlock = document.querySelector('.btn_block');

btnBlock.addEventListener('click', async (e) => {
    if (e.target.dataset.modalTarget === '#modalLog') {
        popup.openModal(modal);
        const enterForm = new EnterForm('login_form', modal);

        enterForm.addEventListenerOnSubmit(async (event) => {
            event.preventDefault();
            const enter = await enterForm.submit();
            if (enter) {
                content.checkLoggedUser();
                router.navigate('/#admin');
            }
        });

    } else if (e.target.dataset.modalTarget === '#modalReg') {
        popup.openModal(modal);
        const registerForm = new RegisterForm('register_form', modal);

        registerForm.addEventListenerOnSubmit(async (event) => {
            event.preventDefault();
            const register = await registerForm.submit();
            if (register) {
                document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
            }
        });
    }
});

const quitBtn = document.querySelector('.quit_btn');
quitBtn.addEventListener('click', () => {
    content.quitUser();
    content.checkLoggedUser();
    router.navigate('/');
});

const listUsers = document.querySelector('.content');

listUsers.addEventListener('click', (event) => {
    // console.log(event.target);
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('.user') || event.target.closest('button');
    const gallery = event.target.closest('.photo_element');

    if (gallery){
        popup.openGallery(gallery);
    }

    if (target) {
        const userId = target.dataset.id;
        const btnAction = event.target.dataset.buttonAction;

        if (btnAction === 'remove-user') {
            const editForm = new EditForm('edit_form', modal);
            editForm.deleteUser(userId, users);
        } else if (btnAction === 'edit-user') {
            popup.openModal(modal);
            modal.id = 'modalEdit';
            const editForm = new EditForm('edit_form', modal);
            editForm.editUser(userId);
        }else if (btnAction === 'add-photo'){
            popup.openModal(modal);
            modal.id = 'modalAddPhoto';
            const photoForm = new PhotoForm('photo_form', modal, content.authUserId);
        }else if (btnAction === 'close-photo'){          
            popup.closeGallery(gallery);
        }else if (btnAction === 'remove-photo'){
            const photo = target.previousElementSibling;
            console.log(photo.src)
        }       
    }    
    
});
