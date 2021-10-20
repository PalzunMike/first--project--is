import Form from './Form.js';
import { popup } from './Popup.js'

export default class EditForm extends Form {

    templateURL = './templates/edit-form-template.html';   

    constructor(...args){
        super(...args); 
        this.getTemplate(this.templateURL);
        this.activateButton(); 
        this.setMaskForPhone();     
    } 

    deleteUser(login, users) {
        const localStorageUserObj = this.storage.getObjectOnStorage('users');
        for (let i = 0; i < users.length; i++) {
            if (users[i].dataset.login === login) {
                users[i].remove();
                delete localStorageUserObj[login];
                this.storage.setObjectOnStorage('users', localStorageUserObj);
            }
        }
    }

    async editUser(login) {
        await this.templateInited;
        const localStorageUserObj = this.storage.getObjectOnStorage('users');
        const modalEditWindow = document.getElementById('modalEdit');
        
        //Наполняем форму из local storage соответвующими значениями;
        for (let index of this.formElement) {
            if (index.type !== 'radio') {
                let inputName = index.name;
                index.value = localStorageUserObj[login][inputName];
            }
        }

        //Проверяем признак sex в local storage, и ставим checked на соответвующий radio button;        
        if (localStorageUserObj[login].sex === 'male') {
            document.getElementById('radioMale').checked = true
        } else if (localStorageUserObj[login].sex === 'female') {
            document.getElementById('radioFemale').checked = true
        }

        //При submit формы меняем объект localStorageUserObj и перезаписываем его в local Storage;
        this.addEventListenerOnSubmit((e) => {
            e.preventDefault();
            if (this.isValid()) {
                this.userObj.sex = this.formElement.sex.value;

                localStorageUserObj[login] = this.userObj;

                // console.log(login);

                this.storage.setObjectOnStorage('users', localStorageUserObj);

                popup.clear(1);
                let message = document.createElement('div');
                message.id = 'succesEdit';
                message.textContent = 'Пользователь успешно изменен!';
                modalEditWindow.append(message);
            }
        })
    }
}