import { Form } from './form.js';
import Popup from './popup.js';
import { localStorageGetInfo, localStorageSetInfo } from './localStorage.js';

let editForm = new Form('edit_form');
const localUserObj = localStorageGetInfo('users');
const listUsers = document.querySelector('.content');
const template = document.querySelector('#user_template');
const userLogin = template.content.querySelector('.user_login');
const userBlock = template.content.querySelector('.user');

for (let user in localUserObj) {
    userLogin.textContent = user;
    userBlock.dataset.login = user;
    let userEl = template.content.cloneNode(true);
    listUsers.append(userEl);
}

const modal = new Popup();
const formEl = document.querySelector('.edit_block');
const modalEl = document.getElementById('modalEdit');

const users = document.querySelectorAll('.user');
function deleteUser(login) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].dataset.login === login) {
            users[i].remove();
            delete localUserObj[login];
            localStorageSetInfo('users', localUserObj);
        }
    }
}

function editUser(login) {
    
    console.log(login);
    
    //Наполняем форму из local storage соответвующими значениями;
    for (let index of editForm.formElement) {
        if (index.type !== 'radio') {
            let inputName = index.name;
            index.value = localUserObj[login][inputName];
        }
    }

    //Проверяем признак sex в local storage, и ставим checked на соответвующий radio button;
    if (localUserObj[login].sex === 'male'){
        document.getElementById('radioMale').checked = true
    }else if (localUserObj[login].sex === 'female'){
        document.getElementById('radioFemale').checked = true
    }

    //При submit формы меняем объект localUserObj и перезаписываем его в local Storage;
    editForm.addEventListenerOnSubmit((e) => {
        e.preventDefault();
        if (editForm.submit()) {
            editForm.userObj.sex = editForm.formElement.sex.value;
            
            localUserObj[login] = editForm.userObj;

            console.log(login);
            
            localStorageSetInfo('users', localUserObj);

            clear(modalEl, 1);
            let message = document.createElement('div');
            message.id = 'succesEdit';
            message.textContent = 'Пользователь успешно изменен!';
            modalEl.append(message);
        }
    })
}

function clear(element, num) {
    while (element.children.length > num) {
        element.removeChild(element.lastChild);
    }
}

listUsers.addEventListener('click', (event) => {
    const target = event.target.closest('div');
    const loginUser = target.dataset.login;
    const btnAction = event.target.dataset.buttonAction;

    if (btnAction === 'remove') {
        deleteUser(loginUser);
    } else if (btnAction === 'edit') {

        const editOpenBtn = document.querySelector('.edit');
        const modalWindow = document.querySelector(editOpenBtn.dataset.modalTarget);        
        modal.openModal(modalWindow);

        clear(modalEl, 1);
        modalEl.append(formEl);
        editUser(loginUser);
    }
});

