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

const modal = new Popup;
const users = document.querySelectorAll('.user');

listUsers.addEventListener('click', (event) => {
    const target = event.target.closest('div'); 
    const loginUser = target.dataset.login;
    const btnAction = event.target.dataset.buttonAction;
    if (btnAction === 'remove'){
        deleteUser(loginUser);
    }
});

function deleteUser(login) {    
    for (let i = 0; i < users.length; i++) {
        if (users[i].dataset.login === login){
            users[i].remove();
            delete localUserObj[login];
            localStorageSetInfo('users', localUserObj);
        }
    }
}

// function clear(element, num) {
//     while (element.children.length > num) {
//         element.removeChild(element.lastChild);
//     }
// }

// function editUser() {
//     let modal = document.getElementById('modalEdit');
//     let formEl = document.querySelector('.edit_block');

//     for (let i = 0; i < users.length; i++) {
        
//         editBtn[i].addEventListener('click', () => {
//             clear(modal, 1);
//             modal.append(formEl);                   

//             for (let index of editForm.formElement) {
//                 let inputName = index.name;
//                 index.value = localUserArr[i][inputName];
//             } 

//             editForm.addEventListenerOnSubmit((e) =>{
//                 console.log(localUserArr[i]);

//                 e.preventDefault();
//             })
//         })
//     }

//     // editForm.addEventListenerOnSubmit((e) => {
//     //     if (!editForm.submit()) {
//     //         e.preventDefault();
//     //     } else {
//     //         editForm.collectInfo();
//     //         // editForm.userObj.sex = editForm.formElement.sex.value;
//     //         // debugger;
//     //         // console.log(localUserArr);
//     //         for (let i = 0; i < localUserArr.length; i++){
//     //             let index = localUserArr[i].indexOf(editForm.formElement.login.value);
//     //             console.log(index);
//     //         }
            
//     //         // console.log(i);

//     //         console.log(editForm.formElement.sex);

//     //         localUserArr[index] = editForm.userObj;
//     //         localStorageSetInfo(`users`, localUserArr)
//     //         clear(modal, 1);
//     //         let message = document.createElement('div');
//     //         message.textContent = 'Пользователь успешно изменен!';
//     //         modal.append(message);
//     //         e.preventDefault();
//     //     }
//     // });    

    
// }

// deleteUser();
// editUser();






