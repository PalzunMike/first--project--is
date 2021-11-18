import EnterForm from './forms/Enter-form.js';
import RegisterForm from './forms/Register-form.js';
import EditForm from './forms/Edit-form.js';
import PostForm from './forms/Post-form.js';
import CommentForm from './forms/Comment-form.js';
import { popup } from './Popup.js';
import { router } from './Router.js';
import { pagePhotoGallery } from "./pages/PagePhotoGallery.js";
import { pageTape } from './pages/PageTape.js';
import { authCheck } from './AuthCheck.js';

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
                router.navigate('/#tape');
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
        await pagePhotoGallery.quitUser();
        router.navigate('/');
    }
});

const contentBlock = document.querySelector('.content');

contentBlock.addEventListener('click', (event) => {
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('.user') || event.target.closest('button') || event.target.closest('.comment');
    const gallery = event.target.closest('.post_element');
    const tapeElement = event.target.closest('.tape_element');

    if (gallery) {
        popup.openGallery(gallery);
    }

    if (tapeElement && authCheck.checkLoggedUser() && !target) {
        pageTape.addOrDeleteLike(tapeElement);
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
        } else if (btnAction === 'add-post') {
            popup.openModal(modal);
            modal.id = 'modalAddPhoto';
            const postForm = new PostForm('post_form', modal, pagePhotoGallery.authUserId);
        } else if (btnAction === 'close-post') {
            popup.closeGallery(gallery);
        } else if (btnAction === 'remove-post') {
            const postElement = target.closest('div');
            const delPhoto = async () => {
                const postId = postElement.dataset.postId;
                await pagePhotoGallery.deletePhoto(postId);
                pagePhotoGallery.renderPhotoGalleryPage();
            }
            delPhoto();
        } else if (btnAction === 'edit-post') {
            const postElement = target.closest('div');
            popup.closeGallery(postElement);
            popup.openModal(modal);
            modal.id = 'modalAddPhoto';
            const postForm = new PostForm('post_form', modal, pagePhotoGallery.authUserId, postElement.dataset.postId);
            postForm.editPost(postElement.dataset.postId);
        } else if (btnAction === 'comment-post') { 
            const commentForm = new CommentForm('comment_form', tapeElement);
            // pageTape.addComment(tapeElement);
        }
    }
});