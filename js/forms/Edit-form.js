import Form from './Form.js';
import { popup } from '../Popup.js';
import { usersDataBase } from '../database/UsersDataBase.js';

export default class EditForm extends Form {

    templateURL = './templates/edit-form-template.html';

    constructor(...args) {
        super(...args);
        this.getTemplate(this.templateURL);
        this.activateButton();
        this.setMaskForPhone();
    }

    deleteUser(userId, users) {
        usersDataBase.deleteUser(userId);
        for (let i = 0; i < users.length; i++) {
            if (users[i].dataset.id === userId) {
                users[i].remove();
            }
        }
    }

    async editUser(userId) {
        await this.templateInited;

        const userData = await usersDataBase.getOneUser(userId);
        const modalEditWindow = document.getElementById('modalEdit');

        //Наполняем форму из local storage соответвующими значениями;
        for (let index of this.formElement) {
            let inputName = index.name;
            if (index.type !== 'radio') {

                if (index.type == 'date' && userData[inputName]) {
                    index.value = userData[inputName].slice(0, 10);
                } else if (userData[inputName]) {
                    index.value = userData[inputName];
                }
            }
        }

        // //Проверяем признак sex в local storage, и ставим checked на соответвующий radio button;        
        if (userData.sex === 'male') {
            document.getElementById('radioMale').checked = true
        } else if (userData.sex === 'female') {
            document.getElementById('radioFemale').checked = true
        }

        //При submit формы меняем объект localStorageUserObj и перезаписываем его в local Storage;
        this.addEventListenerOnSubmit((e) => {
            e.preventDefault();
            Form.clearErrors();
            if (this.isValid()) {
                this.userObj.sex = this.formElement.sex.value;
                this.userObj._id = userId;
                usersDataBase.updateUser(this.userObj);

                popup.clear(1);
                let message = document.createElement('div');
                message.id = 'succesEdit';
                message.textContent = 'Пользователь успешно изменен!';
                modalEditWindow.append(message);
            }
        })
    }
}