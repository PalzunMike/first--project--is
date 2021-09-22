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
        
        editBtn[i].addEventListener('click', () =>{            
            while (modal.children.length > 1) {
                modal.removeChild(modal.lastChild);
            }         
            modal.insertAdjacentHTML('beforeend',`<div class = "edit_block">
                                                <img src="assets/img/photo.png" alt="photo">
                                                <form id = "edit_form">
                                                <label>Адрес эл. почты (логин): <input name="login" id = "login" value = "${localUserArr[i].login}" class = "field" pattern="[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" title="Данная запись не являтся электронной почтой" required ></label><br>
                                                <label>Пароль: <input name="password" id = "password" value = "${localUserArr[i].password}" class = "field" pattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Пароль должен быть не менне 5 символов, а также содержать по крайней мере одно число, одну заглавную и строчную буквы латинского алфавита" required></label><br>
                                                <label>Имя: <input name="firstName" id = "firstName" value = "${localUserArr[i].firstName}" class = "field" required></label><br>
                                                <label>Фамилия: <input name="secondName" id = "secondName" value = "${localUserArr[i].secondName}" class = "field" required></label><br>
                                                <label>Телефон: <input name="phone" id ="password" value = "${localUserArr[i].phone}" class = "field"  pattern="^\\+375(\\s+)?\\(?(17|25|29|33|44)\\)?(\\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$" title="Вы указали телефон в неверном формате" required></label><br>
                                                <label>Дата рождения: <input name="dateOfBirthday" type="date" value = "${localUserArr[i].dateOfBirthday}" class="field"></label>
                                                <div id="sex">Пол: <label><input name="sex" type="radio" id="radioMale" value="male">Мужской</label> <label><input name="sex" type="radio" id="radioFemale" value="female">Женский</label></div>
                                                <label>Дата регистрации: <input name="dateRegister" type="date" value = "${localUserArr[i].dateRegister}" class="field" readonly></label>
                                                <button name = "submit" type="submit" id ="editBtn" formnovalidate>Принять</button>
                                                </form>
                                                </div>`)
            if (localUserArr[i].sex === 'male'){
                document.getElementById('radioMale').checked = true
            }else if (localUserArr[i].sex === 'female'){
                document.getElementById('radioFemale').checked = true
            }
            const editForm = new Form('edit_form');            
            editForm.addEventListenerOnSubmit((e) => {
                if (!editForm.submit()){                    
                    e.preventDefault();
                }else {                    
                    editForm.collectInfo();
                    editForm.userObj.sex = editForm.formElement.sex.value;
                    localUserArr[i] = editForm.userObj;
                    localStorage.setObj(`users`, localUserArr)
                    document.querySelector('.edit_block').textContent = 'Пользователь успешно изменен!';      
                    e.preventDefault();
                }
            });
        })
    }
}
deleteUser();
editUser();






