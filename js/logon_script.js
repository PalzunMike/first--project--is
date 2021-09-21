Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
} 

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
} 

import Popup from './popup.js';

let localUserArr = localStorage.getObj('users');

for (let i = 0; i < localUserArr.length; i++){
    let listUsers = document.querySelector('.content');
    listUsers.insertAdjacentHTML('beforeend', `<div class="user"><p class="user_login">${localUserArr[i].login}</p>
                                    <button class ="edit btn"><img src="assets/img/edit.png"/></button>
                                    <button class ="remove btn"><img src="assets/img/remove.png"/></button></div>`)
    console.log(localUserArr[i].login);
}

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

}


deleteUser();






