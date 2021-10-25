// import {app} from '../server/server.js';

class DataBase {
    proxy = 'http://localhost:5000';

    async addUser(object) {
        try {
            debugger;
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxy}/api/users`, { method: 'POST', body: `${object}`, headers: {'Content-Type': 'application/json'}, });
            const data = await response.json();
            if (!response.ok){
                throw new Error (data.message || 'Что-то пошло не так');
            }
            return data.message;
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUsers() {
        try {
            const response = await fetch(`${this.proxy}/api/users`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async getOneUser(login) {
        try {
            const response = await fetch(`${this.proxy}/api/users/${login}`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}

export const dataBase = new DataBase();