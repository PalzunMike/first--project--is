Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

export function localStorageGetInfo(key) {
    return localStorage.getObj(`${key}`);
}

export function localStorageSetInfo(key, obj) {    
    localStorage.setObj(`${key}`, obj);
}
