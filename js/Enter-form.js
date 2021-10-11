import Form from './Form.js';

export default class EnterForm extends Form {

    verificationUser(object) {        
        const userArrLogin = Object.keys(object);

        if (userArrLogin.includes(this.formElement.login.value)) {
            if (object[this.formElement.login.value].password === this.formElement.password.value) {
                return true;
            } else {
                this.setErrorMsg(this.formElement.password, 'Неверный пароль');
                return false;
            }
        } else {
            this.setErrorMsg(this.formElement.login, 'Пользователь не найден');
            return false;
        }
    }

    submit() {
        if (!(this.isValid())) {
            return false;
        } else {
            this.collectInfo();
            return true;
        }
    }
}