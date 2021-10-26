import Form from './Form.js';
import { popup } from './Popup.js';
import { dataBase } from './DataBase.js';

export default class EditForm extends Form {

    templateURL = './templates/edit-form-template.html';

    constructor(...args) {
        super(...args);
        this.getTemplate(this.templateURL);
        this.activateButton();
        this.setMaskForPhone();
    }

    deleteUser(userId, users) {
        dataBase.deleteUser(userId);
        for (let i = 0; i < users.length; i++){
           if (users[i].dataset.id === userId){
               users[i].remove();
           }
        }
    }

    async editUser(userId) {
        await this.templateInited;

        const userData = await dataBase.getOneUser(userId);
        console.log(userData);
        // const localStorageUserObj = this.storage.getObjectOnStorage('users');
        const modalEditWindow = document.getElementById('modalEdit');

        //Наполняем форму из local storage соответвующими значениями;
        for (let index of this.formElement) { //TODO: Разобраться с датами и паролем!!!!!
            if (index.type !== 'radio') {
                let inputName = index.name;
                index.value = userData[inputName];
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
            if (this.isValid()) {
                this.userObj.sex = this.formElement.sex.value;
                this.userObj._id = userId;

                console.log(this.userObj);

                dataBase.updateUser(this.userObj);

                // localStorageUserObj[login] = this.userObj;

                // this.storage.setObjectOnStorage('users', localStorageUserObj);

                popup.clear(1);
                let message = document.createElement('div');
                message.id = 'succesEdit';
                message.textContent = 'Пользователь успешно изменен!';
                modalEditWindow.append(message);
            }
        })
    }
}