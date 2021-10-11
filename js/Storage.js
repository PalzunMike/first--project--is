export default class Storage {

    constructor() {
        // this.key = key;
        // this.object = object;
    }

    setObjectOnStorage(key, object) {
        localStorage.setItem(key, JSON.stringify(object))
    }

    getObjectOnStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}


