import Page from './adminPage.js'
import Storage from './Storage.js'
import EnterForm from './Enter-form.js';
import RegisterForm from './Register-form.js';
import EditForm from './Edit-form.js';
import Popup from './Popup.js';


const page = new Page();

const localUserObj = page.storage.getObjectOnStorage('users');

const popup = new Popup();
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
    if (enterForm.submit() && enterForm.verificationUser(localUserObj)) {
        window.location.href = "../index-logon.html";
    }
});

registerForm.addEventListenerOnSubmit((e) => {
    e.preventDefault();
    if (registerForm.submit()) {
        document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
    }
});


// const listUsers = document.querySelector('.content');
// const template = document.querySelector('#user_template');
// const userLogin = template.content.querySelector('.user_login');
// const userBlock = template.content.querySelector('.user');



// for (let user in localUserObj) {
//     userLogin.textContent = user;
//     userBlock.dataset.login = user;
//     let userEl = template.content.cloneNode(true);
//     listUsers.append(userEl);
// }

// const formEl = document.querySelector('.edit_block');
// const modalEl = document.getElementById('modalEdit');

// const users = document.querySelectorAll('.user');

// listUsers.addEventListener('click', (event) => {
//     const target = event.target.closest('div');
//     const loginUser = target.dataset.login;
//     const btnAction = event.target.dataset.buttonAction;

//     if (btnAction === 'remove') {
//         deleteUser(loginUser);
//     } else if (btnAction === 'edit') {

//         const editOpenBtn = document.querySelector('.edit');
//         const modalWindow = document.querySelector(editOpenBtn.dataset.modalTarget);
//         modal.openModal(modalWindow);

//         clear(modalEl, 1);
//         modalEl.append(formEl);
//         editUser(loginUser);
//     }
// });







