export class Form { 
  
  userObj = {};

  constructor(form) { 
    this.formElement = document.getElementById(form);
    this.activateButton();    
    
    Storage.prototype.setObj = function(key, obj) {
      return this.setItem(key, JSON.stringify(obj))
    }    
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }          
  } 

  activateButton(){    
    for (let i = 0; i < this.formElement.length; i++){   
      this.formElement[i].addEventListener('input', () =>{   
        if (this.formElement[i].tagName === 'INPUT' && this.formElement[i].value.length > 0){
          this.formElement.elements.submit.disabled = false;
        } else {
          this.formElement.elements.submit.disabled = 'disabled';
        }        
      })
    }  
  }

  setMaskForPhone(event, element){ 

      function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange){
          elem.setSelectionRange(pos, pos)
        }else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
      }

      function mask(event) {
        
        let matrix = "+375 (__) ___-__-__",
            p = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");

            if (def.length >= val.length){
              val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
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
      const input = element;
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
    }

    addEventListenerForMask(callback){
      window.addEventListener('DOMContentLoaded', callback);
  }  


  collectInfo(){
    for (let i = 0; i < this.formElement.length; i++){      
      if (this.formElement[i].tagName === 'INPUT' && this.formElement[i].type !== 'radio'){
        let nameKey = this.formElement[i].name;
        let key = this.formElement[i].value;       
        this.userObj[nameKey] = key;    
      }  
    }   
  }

  setErrorMsg(element, message){
    const errors = document.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++){
      if (element.previousSibling.className == 'error'){
        element.previousSibling.remove();
      }
    }      
    const error = document.createElement('span');      
    element.style.boxShadow = '0 0 4px 1px #F22';      
    error.className = 'error';
    error.innerHTML = message;
    element.before(error);      
  }

  isValid(){  
    const validArray = [];
    for (let i = 0; i < this.formElement.length; i++){      
      const element = this.formElement[i]; 
      const regExp = new RegExp(element.pattern);       
      if (element.validity.valueMissing){
        this.setErrorMsg(element, element.validationMessage);
        validArray.push(0);
      }else if (!regExp.test(element.value)){        
        this.setErrorMsg(element, element.title);
        validArray.push(0);
      }else {validArray.push(1)}        
    }  

    if (validArray.includes(0)){
      return false;
    }else {return true;}
  }

  submit(){      
    if (!(this.isValid())){
      return false;
    }else {
      this.collectInfo();
      return true;
    }        
  } 

  addEventListenerOnSubmit(callback){
    this.formElement.addEventListener('submit', callback);
  }
}

export class RegForm extends Form{
  
    addUser(){
    let localUserArr = localStorage.getObj('users');
    let userArr = [];
    let dateReg = new Date().toISOString().slice(0, 10);    
    this.userObj.dateRegister = dateReg;
    if (localUserArr === null){
      userArr.push(this.userObj);
      localStorage.setObj('users', userArr);
    }else {
      localUserArr.push(this.userObj);
      localStorage.setObj('users', localUserArr);
    }
  }

  checkUser(){
    let contUserArr = [];
    let localUserArr = localStorage.getObj('users'); 

    if (localUserArr === null){
      return false;
    } else {
        for (let user of localUserArr){          
          if (user.login === this.userObj.login){
            contUserArr.push(1);
          }else{
            contUserArr.push(0);
          }
        }
      }

    if (contUserArr.includes(1)){
      super.setErrorMsg(this.formElement.login, 'Пользователь с такой почтой уже зарегистрирован!');
      return true;
    }else{
      return false;
    }    
  } 

  submit(){

    if (!(super.submit())){
      return false;
    }else if (this.checkUser()){  
      return false;
    }else {
      this.addUser()    
      return true;
    }    
  }
}