import {Form, RegForm} from './form.js';
import Popup from './popup.js';

const loginForm = new Form('login_form');
const registerForm = new RegForm('register_form');
const modal = new Popup;
let localUsers = localStorage.getObj('users');

loginForm.addEventListenerOnSubmit((e) => {
    if (!loginForm.submit()){
        e.preventDefault();
    }else{
        e.preventDefault();
        if (verificationUser()){
            window.location.href = "../index-logon.html"; 
        }            
    }   
});

registerForm.addEventListenerOnSubmit((e) => {
    if (!registerForm.submit()){
        e.preventDefault();
    }else {      
      document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';      
      e.preventDefault();
    }
});

registerForm.addEventListenerForMask((e) => {
    registerForm.setMaskForPhone(e, registerForm.formElement.telefon );
});



function verificationUser(){
    
    for (let user of localUsers){          
        if (user.login === loginForm.formElement.login.value){
            if (user.password === loginForm.formElement.password.value){
                return true;
            }else {
                loginForm.setErrorMsg(loginForm.formElement.password, 'Неверный логин');
                return false;
            }
        }else{
            loginForm.setErrorMsg(loginForm.formElement.login, 'Пользователь не найден');
            return false;
        }
    }    
}



