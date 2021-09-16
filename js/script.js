import {Form, RegForm} from './form.js';
import Popup from './popup.js';

const loginForm = new Form('login_form');
const registerForm = new RegForm('register_form');
const modal = new Popup;

loginForm.addEventListenerOnSubmit((e) => {

    if (!loginForm.submit()){
        e.preventDefault();
    }    
});

registerForm.addEventListenerOnSubmit((e) => {
    if (!registerForm.submit()){
        e.preventDefault();
    }   
});