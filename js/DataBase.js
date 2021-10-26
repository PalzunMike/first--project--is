// import {app} from '../server/server.js';

class DataBase {
    proxy = 'http://localhost:5000';

    async addUser(object) {
        try {
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxy}/api/users/register`, { method: 'POST', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    async authUser(object) {
        try {
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxy}/api/users/auth`, { method: 'POST', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            const token = await data.token;
            const userId = await data.userId;
            localStorage.setItem('userData', JSON.stringify({ userId, token }));
            return data;
        } catch (e) {
           return e;
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

    async updateUser(object) {
        try {
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxy}/api/users`, { method: 'PUT', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(id){
        try {
            const response = await fetch(`${this.proxy}/api/users/${id}`, { method: 'DELETE' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}

export const dataBase = new DataBase();