import {Form, RegForm} from './form.js';
import Popup from './popup.js';

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
} 

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
} 

let localUserArr = localStorage.getObj('users');

for (let i = 0; i < localUserArr.length; i++){
    let listUsers = document.querySelector('.content');
    listUsers.insertAdjacentHTML('beforeend', `<div class="user"><p class="user_login">${localUserArr[i].login}</p>
                                    <button data-modal-target="#modalEdit" class ="edit btn"><img src="assets/img/edit.png"/></button>
                                    <button class ="remove btn"><img src="assets/img/remove.png"/></button></div>`)    
}

const modal = new Popup;

let editBtn = document.querySelectorAll('.edit');
let removeBtn = document.querySelectorAll('.remove');
let userLogin = document.querySelectorAll('.user_login');
let users = document.querySelectorAll('.user');

function deleteUser(){
    for (let i = 0; i < userLogin.length; i++){
        removeBtn[i].addEventListener('click', () => {            
            users[i].remove();
            localUserArr.splice([i], 1);
            localStorage.setObj('users', localUserArr);
        })        
    }
}

function editUser(){
    let modal = document.getElementById('modalEdit');
    for (let i = 0; i < userLogin.length; i++){
        let localUserArr = localStorage.getObj('users');
        editBtn[i].addEventListener('click', () =>{  
            while (modal.children.length > 1) {
                modal.removeChild(modal.lastChild);
            }         
            modal.insertAdjacentHTML('beforeend',`<div class = "edit_block">
                                                <form id = "edit_form">
                                                <label>Адрес эл. почты (логин): <input id = "login" value = "${localUserArr[i].login}" class = "field"></label><br>
                                                <label>Пароль: <input id = "password" value = "${localUserArr[i].password}" class = "field"></label><br>
                                                <label>Имя: <input id = "firstName" value = "${localUserArr[i].firstName}" class = "field"></label><br>
                                                <label>Фамилия: <input id = "secondName" value = "${localUserArr[i].secondName}" class = "field"></label><br>
                                                <label>Телефон: <input id = "password" value = "${localUserArr[i].phone}" class = "field"></label><br>
                                                <button type="button" id = "editBtn">Принять</button>
                                                </form>
                                                </div>`)
            const editForm = new Form('edit_form');
            const accept = document.getElementById('editBtn');
            // accept.addEventListener('click', editForm.isValid());
            // console.log(editForm);
        })
    }
}


deleteUser();
editUser();






