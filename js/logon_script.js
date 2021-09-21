Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
} 

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
} 

let localUserArr = localStorage.getObj('users');


for (let i = 0; i < localUserArr.length; i++){
    let listUsers = document.querySelector('.list_users');
    listUsers.insertAdjacentHTML('beforeend', `<li>${localUserArr[i].login}</li>`)
    console.log(localUserArr[i].login);
}


