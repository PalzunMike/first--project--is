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

  collectInfo(){    
    for (let i = 0; i < this.formElement.length; i++){      
      if (this.formElement[i].tagName === 'INPUT'){
        let nameKey = this.formElement[i].name;
        let key = this.formElement[i].value;       
        this.userObj[nameKey] = key;    
      }  
    }   
  }

  isValid(){    
    const validArray = [];

    for (let i = 0; i < this.formElement.length; i++){      
      const element = this.formElement[i]; 
      const regExp = new RegExp(element.pattern);       
      if (element.validity.valueMissing){
        setErrorMsg(element, element.validationMessage);
        validArray.push(0);
      }else if (!regExp.test(element.value)){        
        setErrorMsg(element, element.title);
        validArray.push(0);
      }else {validArray.push(1)}        
    }  

    if (validArray.includes(0)){
      return false;
    }else {return true;}

    function setErrorMsg(element, message){
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
    let userArr = [];
    let localUserArr = localStorage.getObj('users');
    let contUserArr = [];    
    if (localUserArr === null){
      userArr.push(this.userObj);
      localStorage.setObj('users', userArr);
    }else {
      for (let user of localUserArr){
        if (user.login === this.userObj.login){
          contUserArr.push(1);
        }else {
          contUserArr.push(0);
        }
      }
    }
    if (contUserArr.includes(1)){
      alert('Пользователь с такой почтой уже зарегистрирован!')
      return false;
    }else {
      localUserArr.push(this.userObj);
      localStorage.setObj('users', localUserArr);
    }
  }

  submit(){        
    if (!(super.submit())){
      return false;
    }else{
      this.addUser();
      return true;
    }    
  }
}