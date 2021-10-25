import Form from './Form.js';
import { dataBase } from './DataBase.js';

export default class RegisterForm extends Form {

  templateURL = './templates/register-form-template.html';

  constructor(...args) {
    super(...args);
    this.getTemplate(this.templateURL);
    this.activateButton();
    this.setMaskForPhone();
  }

  addUser() {
    let dateReg = new Date().toISOString().slice(0, 10);
    this.userObj.dateRegister = dateReg;

    dataBase.addUser(this.userObj);
    // console.log(message);
    // }catch(e){
    //   console.log(e);
    // }


    // console.log(dataBase.addUser(this.userObj));


    // let tempUserObj = {};
    // const localStorageUserObj = this.storage.getObjectOnStorage('users');    
    // console.log(this.userObj);
    // if (localStorageUserObj === null) {
    //   tempUserObj[this.userObj.login] = this.userObj;
    //   this.storage.setObjectOnStorage(`users`, tempUserObj);
    // } else {
    //   localStorageUserObj[this.userObj.login] = this.userObj;
    //   this.storage.setObjectOnStorage(`users`, localStorageUserObj);
    // }

  }

  async checkUser() {
    const dataUser = await dataBase.getOneUser(this.userObj.login);

    if (dataUser.length) {
      super.setErrorMsg(this.formElement.login, 'Пользователь с такой почтой уже зарегистрирован!');
      return true;
    }
    return false;

    // return false;
    // const localStorageUserObj = this.storage.getObjectOnStorage('users');
    // let contUserArr = [];

    // if (localStorageUserObj === null) {
    //   return false;
    // } else {
    //   for (let user in localStorageUserObj) {
    //     if (user === this.userObj.login) {
    //       contUserArr.push(1);
    //     } else {
    //       contUserArr.push(0);
    //     }
    //   }
    // }

    // if (contUserArr.includes(1)) {
    //   super.setErrorMsg(this.formElement.login, 'Пользователь с такой почтой уже зарегистрирован!');
    //   return true;
    // } else {
    //   return false
    // }
  }

  async submit() {
    if (!(this.isValid())) {
      return false;
    } else {
      const check = await this.checkUser();
      if (check) {
        return false;
      }
      else {
        this.addUser();
        return true;
      }
    }
    return true;
  }
}