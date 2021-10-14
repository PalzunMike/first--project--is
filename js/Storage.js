class Storage {

    setObjectOnStorage(key, object) {
        localStorage.setItem(key, JSON.stringify(object))
    }

    getObjectOnStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const storage = new Storage();