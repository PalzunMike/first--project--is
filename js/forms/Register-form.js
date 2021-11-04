import Form from './Form.js';
import { usersDataBase } from '../database/UsersDataBase.js';

export default class RegisterForm extends Form {

  templateURL = './templates/register-form-template.html';

  constructor(...args) {
    super(...args);
    this.getTemplate(this.templateURL);
    this.activateButton();
    this.setMaskForPhone();
  }

  async addUser() {
    Form.clearErrors();
    let dateReg = new Date().toISOString().slice(0, 10);
    this.userObj.dateRegister = dateReg;

    const register = await usersDataBase.registerUser(this.userObj);
    if (register.message) {
      super.setErrorMsg(this.formElement.login, register.message);
      return false;
    }
    return true;
  }  

  async submit() {
    if (!(this.isValid())) {
      return false;
    } else {
      const register = await this.addUser();
      if (!register) {
        return false;
      }
    }
    return true;
  }
}