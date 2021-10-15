import { storage } from "./Storage.js";
export default class Form {

  userObj = {};
  template;
  templateInited;

  constructor(form, parentElement) {
    this.form = form;
    this.formElement;
    this.storage = storage;
    this.parentElement = parentElement;
    // console.log(this.formElement);
    // this.formElement.addEventListener('load', (e) => {
    //   if (this.formElement.phone) {// TODO:    
    //     this.setMaskForPhone(e);
    //   }
    // })

  }

  async getTemplate() {
    this.templateInited = new Promise(async (resolve, reject) => {
      const responce = await fetch(this.templateURL);
      const template = await responce.text();
      this.template = template;
      this.renderForm(this.parentElement);
      resolve();
    });
  }

   renderForm(modal) {
    modal.insertAdjacentHTML('beforeend', this.template); 
    this.formElement = document.getElementById(this.form);
  }

  static clearErrors() {
    const errors = document.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
      errors[i].nextSibling.style.boxShadow = 'none';
      errors[i].remove();
    }
    for (let i = 0; i < document.forms.length; i++) {
      document.forms[i].submit.disabled = 'disabled';
      document.forms[i].reset();
    }
  }

  async activateButton() {
    await this.templateInited;
    this.formElement.addEventListener('input', () => {
      for (let element of this.formElement) {
        if (element.value.length > 0 && element.value !== "+375 (__) ___-__-__") {
          this.formElement.elements.submit.disabled = false;
          return false;
        } else {
          this.formElement.elements.submit.disabled = 'disabled';
        }
      }
    })
  }

  async setMaskForPhone() {
    await this.templateInited;

    this.formElement.addEventListener('load', (e) => {
      if (this.formElement.phone) {  
        mask(e);
      }
    })

    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos)
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    }

    function mask(event) {

      let matrix = "+375 (__) ___-__-__";
      let p = 0;
      const def = matrix.replace(/\D/g, "");
      let val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && p < val.length ? val.charAt(p++) : p >= val.length ? "" : a;
      })

      if (event.type == "blur") {
        if (this.value.length == 2) {
          this.value = ""
        }
      } else {
        setCursorPosition(this.value.length, this)
      }
    }

    const input = this.formElement.phone;
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  }


  collectInfo() {
    for (let i = 0; i < this.formElement.length; i++) {
      if (this.formElement[i].tagName === 'INPUT') {
        let nameKey = this.formElement[i].name;
        let key = this.formElement[i].value;
        this.userObj[nameKey] = key;
      }
    }
    this.userObj.userActive = false;
  }

  setErrorMsg(element, message) {
    const errors = document.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
      if (element.previousSibling.className == 'error') {
        element.previousSibling.remove();
      }
    }
    const error = document.createElement('span');
    element.style.boxShadow = '0 0 4px 1px #F22';
    error.className = 'error';
    error.innerHTML = message;
    element.before(error);
  }

  isValid() {
    const validArray = [];
    for (let i = 0; i < this.formElement.length; i++) {
      const element = this.formElement[i];
      const regExp = new RegExp(element.pattern);
      if (element.validity.valueMissing) {
        this.setErrorMsg(element, element.validationMessage);
        validArray.push(0);
      } else if (!regExp.test(element.value)) {
        this.setErrorMsg(element, element.title);
        validArray.push(0);
      } else { validArray.push(1) }
    }

    if (validArray.includes(0)) {
      return false;
    } else {
      this.collectInfo();
      return true;
    }
  }

  async addEventListenerOnSubmit(callback) {
    await this.templateInited;
    this.formElement.addEventListener('submit', callback);
  }
}