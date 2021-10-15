import Form from './Form.js';

export default class RegisterForm extends Form {

  templateURL = './templates/register-form-template.html';

  constructor(...args) {
    super(...args);
    this.getTemplate();
    this.activateButton();    
    this.setMaskForPhone();

    
  }

  addUser() {
    let tempUserObj = {};
    const localStorageUserObj = this.storage.getObjectOnStorage('users');
    let dateReg = new Date().toISOString().slice(0, 10);
    this.userObj.dateRegister = dateReg;
    if (localStorageUserObj === null) {
      tempUserObj[this.userObj.login] = this.userObj;
      this.storage.setObjectOnStorage(`users`, tempUserObj);
    } else {
      localStorageUserObj[this.userObj.login] = this.userObj;
      this.storage.setObjectOnStorage(`users`, localStorageUserObj);
    }
  }

  checkUser() {
    const localStorageUserObj = this.storage.getObjectOnStorage('users');
    let contUserArr = [];

    if (localStorageUserObj === null) {
      return false;
    } else {
      for (let user in localStorageUserObj) {
        if (user === this.userObj.login) {
          contUserArr.push(1);
        } else {
          contUserArr.push(0);
        }
      }
    }

    if (contUserArr.includes(1)) {
      super.setErrorMsg(this.formElement.login, 'Пользователь с такой почтой уже зарегистрирован!');
      return true;
    } else {
      return false
    }
  }

  submit() {

    if (!(this.isValid())) {
      return false;
    } else {
      if (this.checkUser()) {
        return false;
      } else {
        this.addUser();
        return true;
      }
    }
    return true;
  }
}