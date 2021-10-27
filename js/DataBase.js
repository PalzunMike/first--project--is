class DataBase {
    proxyURL = 'http://localhost:5000';



    async addUser(object) {
        try {
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxyURL}/api/users/register`, { method: 'POST', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
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
            const response = await fetch(`${this.proxyURL}/api/users/auth`, { method: 'POST', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            if (!response.ok) {
                throw new Error( data.message || 'Что-то пошло не так');
            }                     
            return data;
        } catch (e) {  
            return e;
        }
    }

    async getAllUsers() {
        try {
            const response = await fetch(`${this.proxyURL}/api/users`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async getOneUser(userId) {
        try {
            const response = await fetch(`${this.proxyURL}/api/users/${userId}`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(object) {
        try {
            object = JSON.stringify(object);
            const response = await fetch(`${this.proxyURL}/api/users`, { method: 'PUT', body: `${object}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.proxyURL}/api/users/${userId}`, { method: 'DELETE' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}

export const dataBase = new DataBase();