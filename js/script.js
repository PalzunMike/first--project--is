import Page from './adminPage.js'
import EnterForm from './Enter-form.js';
import RegisterForm from './Register-form.js';
import EditForm from './Edit-form.js';
import { popup } from './Popup.js';


const page = new Page();
const enterForm = new EnterForm('login_form');
const registerForm = new RegisterForm('register_form');
const editForm = new EditForm('edit_form');


const enterOpenBtn = document.querySelector('.singInBtn');
const registerOpenBtn = document.querySelector('.regBtn');

const modalEnterWindow = document.querySelector(enterOpenBtn.dataset.modalTarget);
const modalPasswordWindow = document.querySelector(registerOpenBtn.dataset.modalTarget);


enterOpenBtn.addEventListener('click', () => {
    popup.openModal(modalEnterWindow);
});

registerOpenBtn.addEventListener('click', () => {
    popup.openModal(modalPasswordWindow)
});


enterForm.addEventListenerOnSubmit((e) => {
    e.preventDefault();
    if (enterForm.submit()) {
        page.renderUsers();
    }
});

registerForm.addEventListenerOnSubmit((e) => {
    e.preventDefault();
    if (registerForm.submit()) {
        document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
    }
});

const quitBtn = document.querySelector('.quit_btn');

quitBtn.addEventListener('click', page.quitUser);

const formEl = document.querySelector('.edit_block');
const listUsers = document.querySelector('.content');


listUsers.addEventListener('click', (event) => {
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('div');
    const loginUser = target.dataset.login;
    const btnAction = event.target.dataset.buttonAction;

    if (btnAction === 'remove') {
        editForm.deleteUser(loginUser, users);
    } else if (btnAction === 'edit') {

        const editOpenBtn = document.querySelector('.edit');
        const modalEditWindow = document.querySelector(editOpenBtn.dataset.modalTarget);
        popup.openModal(modalEditWindow);

        popup.clear(1);
        modalEditWindow.append(formEl);
        editForm.editUser(loginUser);
    }
});







