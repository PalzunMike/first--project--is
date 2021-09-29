import { Form } from './form.js';
import Popup from './popup.js';
import { localStorageGetInfo, localStorageSetInfo } from './localStorage.js';

let editForm = new Form('edit_form');

const listUsers = document.querySelector('.content');
const template = document.querySelector('#user_template');
const userLogin = template.content.querySelector('.user_login');
const userBlock = template.content.querySelector('.user');

for (let i = 0; i < localStorage.length; i++) {
    userLogin.textContent = localStorage.key(i);
    userBlock.dataset.login = localStorage.key(i);
    let user = template.content.cloneNode(true);
    listUsers.append(user);
}

const modal = new Popup;

const editBtn = document.querySelectorAll('.edit');
const removeBtn = document.querySelectorAll('.remove');
const users = document.querySelectorAll('.user');


function deleteUser(login) {

    for (let i = 0; i < users.length; i++) {
        removeBtn[i].addEventListener('click', () => {
            users[i].remove();
            localUserArr.splice([i], 1);
            localStorageSetInfo('users', localUserArr);
        })
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

deleteUser();
// editUser();






