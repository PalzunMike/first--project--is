import Form from './Form.js';
import { usersDataBase } from '../database/UsersDataBase.js';
// import database from 'mime-db';

export default class EnterForm extends Form {

    templateURL = './templates/enter-form-template.html';

    constructor(...args) {
        super(...args);
        this.getTemplate(this.templateURL);
        this.activateButton();
    }

    async authorizationUser() {
        Form.clearErrors();
        const auth = await usersDataBase.authUser(this.userObj);

        if (auth.message === 'Пользователь не найден') {
            this.setErrorMsg(this.formElement.login, auth.message);
            return false;
        } else if (auth.message) {
            this.setErrorMsg(this.formElement.password, auth.message);
            return false;
        }
        const token = await auth.token;
        const userId = await auth.userId;
        localStorage.setItem('userData', JSON.stringify({ userId, token }));
        return true;
    }

    async submit() {

        if (!this.isValid()) {
            return false;
        } else {
            const authorization = await this.authorizationUser();
            if (!authorization) {
                return false;
            }
        }
        return true;
    }
}