import { Form, RegForm } from './form.js';
import { localStorageGetInfo } from './localStorage.js';
import Popup from './popup.js';

const loginForm = new Form('login_form');
const registerForm = new RegForm('register_form');
const modal = new Popup;

loginForm.addEventListenerOnSubmit((e) => {
    if (!loginForm.submit()) {
        e.preventDefault();
    } else {
        e.preventDefault();
        if (verificationUser()) {
            window.location.href = "../index-logon.html";
        }
    }
});

registerForm.addEventListenerOnSubmit((e) => {
    if (!registerForm.submit()) {
        e.preventDefault();
    } else {
        document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
        e.preventDefault();
    }
});

registerForm.addEventListenerForMask((e) => {
    registerForm.setMaskForPhone(e, registerForm.formElement.phone);
});



function verificationUser() {
    let localUsers = localStorageGetInfo('users');
    let wrightLogin = false;
    let wrightPass = true;
    for (let user of localUsers) {
        if (user.login === loginForm.formElement.login.value) {
            if (user.password === loginForm.formElement.password.value) {
                return true;
            } else {
                wrightLogin = true;
                wrightPass = false;
            }
        } else {
            wrightLogin = false;
        }
    }
    if (!wrightLogin) {
        loginForm.setErrorMsg(loginForm.formElement.login, 'Пользователь не найден');
        return false;
    } else if (!wrightPass) {
        loginForm.setErrorMsg(loginForm.formElement.password, 'Неверный пароль');
        return false;
    }
}




