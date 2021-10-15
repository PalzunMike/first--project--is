import Page from './adminPage.js'
import EnterForm from './Enter-form.js';
import RegisterForm from './Register-form.js';
import EditForm from './Edit-form.js';
import { popup } from './Popup.js';

const modal = document.querySelector('.modal');
const page = new Page();
const btnBlock = document.querySelector('.btn_block');

btnBlock.addEventListener('click', async (e) => {
    if (e.target.dataset.modalTarget === '#modalLog') {
        popup.openModal(modal);
        const enterForm = new EnterForm('login_form', modal);

        enterForm.addEventListenerOnSubmit((event) => {
            event.preventDefault();
            if (enterForm.submit()) {
                page.renderUsers();
            }
        });

    } else if (e.target.dataset.modalTarget === '#modalReg') {
        popup.openModal(modal);
        const registerForm = new RegisterForm('register_form', modal);

        registerForm.addEventListenerOnSubmit((event) => {
            event.preventDefault();
            if (registerForm.submit()) {
                document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
            }
        });
    }
});

const quitBtn = document.querySelector('.quit_btn');
quitBtn.addEventListener('click', page.quitUser);

const listUsers = document.querySelector('.content');
// const formEditBlock = document.querySelector('.edit_block');

listUsers.addEventListener('click', (event) => {
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('div');
    const loginUser = target.dataset.login;
    const btnAction = event.target.dataset.buttonAction;

    if (btnAction === 'remove') {
        editForm.deleteUser(loginUser, users);
    } else if (btnAction === 'edit') {
        popup.openModal(modal);
        modal.id = 'modalEdit';
        const editForm = new EditForm('edit_form', modal);
        editForm.editUser(loginUser);
    }
});