import  Form  from './Form.js';

export default class RegisterForm extends Form {

  addUser() {
    let tempUserObj = {};
    let localUserObj = localStorageGetInfo('users');
    let dateReg = new Date().toISOString().slice(0, 10);
    this.userObj.dateRegister = dateReg;
    if (localUserObj === null) {
      tempUserObj[this.userObj.login] = this.userObj;
      localStorageSetInfo(`users`, tempUserObj);
    } else {
      localUserObj[this.userObj.login] = this.userObj;
      localStorageSetInfo(`users`, localUserObj);
    }
  }

  checkUser() {
    let localUserObj = localStorageGetInfo('users');
    let contUserArr = [];

    if (localUserObj === null) {
      return false;
    } else {
      for (let user in localUserObj) {
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

    if (!(super.submit())) {
      return false;
    } else {
      if (this.checkUser()) {
        return false;
      } else {
        this.addUser()
        return true;
      }
    }
  }
}