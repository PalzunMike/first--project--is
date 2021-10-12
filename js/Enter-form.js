import Form from './Form.js';

export default class EnterForm extends Form {

    verificationUser() {
        const localStorageUserObj = this.storage.getObjectOnStorage('users');
        const userArrLogin = Object.keys(localStorageUserObj);

        if (userArrLogin.includes(this.formElement.login.value)) {
            if (localStorageUserObj[this.formElement.login.value].password === this.formElement.password.value) {
                localStorageUserObj[this.formElement.login.value].userActive = true;
                this.storage.setObjectOnStorage(`users`, localStorageUserObj);
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
        if (!this.isValid() || !this.verificationUser()) {
            return false;
        } else { return true; }
    }
}