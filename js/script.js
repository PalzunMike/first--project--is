import { Form, RegForm } from './form.js';
import { localStorageGetInfo } from './localStorage.js';
import Popup from './popup.js';

const loginForm = new Form('login_form');
const registerForm = new RegForm('register_form');
const modal = new Popup();

loginForm.addEventListenerOnSubmit((e) => {
    e.preventDefault();
    if (loginForm.submit() && verificationUser()) {
        window.location.href = "../index-logon.html";
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

function verificationUser() {
    let localUserObj = localStorageGetInfo('users');
    const userArrLogin = Object.keys(localUserObj);

    if (userArrLogin.includes(loginForm.formElement.login.value)) {
        if (localUserObj[loginForm.formElement.login.value].password === loginForm.formElement.password.value) {
            return true;
        } else {
            loginForm.setErrorMsg(loginForm.formElement.password, 'Неверный пароль');
            return false;
        }
    } else {
        loginForm.setErrorMsg(loginForm.formElement.login, 'Пользователь не найден');
        return false;
    }
}




