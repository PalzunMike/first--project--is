import EnterForm from './forms/Enter-form.js';
import RegisterForm from './forms/Register-form.js';
import EditForm from './forms/Edit-form.js';
import PhotoForm from './forms/Photo-form.js';
import { popup } from './Popup.js';
import { router } from './Router.js';
import { pageHome } from "./pages/PageHome.js";
import { pagePhotoGallery } from "./pages/PagePhotoGallery.js"

const modal = document.querySelector('.modal');
const header = document.getElementById('header');

header.addEventListener('click', async (e) => {
    if (e.target.dataset.modalTarget === '#modalLog') {
        popup.openModal(modal);
        const enterForm = new EnterForm('login_form', modal);

        enterForm.addEventListenerOnSubmit(async (event) => {
            event.preventDefault();
            const enter = await enterForm.submit();
            if (enter) {
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

    } else if (e.target.dataset.quitButton === 'quit') {
        pageHome.quitUser();
        router.navigate('/');
    }
});

const contentBlock = document.querySelector('.content');

contentBlock.addEventListener('click', (event) => {
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('.user') || event.target.closest('button');
    const gallery = event.target.closest('.photo_element');

    if (gallery) {
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
        } else if (btnAction === 'add-photo') {
            popup.openModal(modal);
            modal.id = 'modalAddPhoto';
            const photoForm = new PhotoForm('photo_form', modal, pagePhotoGallery.authUserId);
        } else if (btnAction === 'close-photo') {
            popup.closeGallery(gallery);
        } else if (btnAction === 'remove-photo') {
            const photo = target.previousElementSibling;
            const delPhoto = async () => {
                await pagePhotoGallery.deletePhoto(photo.dataset.path);
                pagePhotoGallery.renderPhotoGalleryPage();
            }
            delPhoto();
        }
    }
});